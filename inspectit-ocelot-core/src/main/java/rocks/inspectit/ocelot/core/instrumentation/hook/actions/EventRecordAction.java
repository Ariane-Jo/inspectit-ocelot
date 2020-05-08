package rocks.inspectit.ocelot.core.instrumentation.hook.actions;

import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import rocks.inspectit.ocelot.config.model.instrumentation.rules.EventRecordingSettings;
import rocks.inspectit.ocelot.core.instrumentation.hook.VariableAccessor;
import rocks.inspectit.ocelot.sdk.events.EventExporterService;
import rocks.inspectit.ocelot.sdk.events.EventObject;

import java.util.*;

/**
 * THESIS-TAG: Added this class: Will be called whenever an event should be created. Execute should transform the event then along with the available data
 */

@Slf4j
@Value
public class EventRecordAction implements IHookAction {

    Collection<EventRecordingSettings> events;

    Map<String, VariableAccessor> valueAccessors;

    EventExporterService exporter = new EventExporterService();

    /**
     * TODO-THESIS: Instrumentation could currently overwritten! Bad code. really bad code.
     * TODO-THESIS: Variables with value null cause it to crash....
     */

    @Override
    public void execute(ExecutionContext context) {
        for(EventRecordingSettings event : events) {
            EventObject result = new EventObject();

            String nameValue = getVariableValue(context, event.getName()) instanceof String ? (String) getVariableValue(context, event.getName()) : event.getName();
            Long timeValue = getVariableValue(context, event.getTimestamp().toString()) instanceof Long ? (Long) getVariableValue(context, event.getTimestamp().toString()) : event.getTimestamp();

            result.setName(nameValue);
            result.setTimestamp(timeValue);
            result.setAttributes((Map<String, Object>) EventRecordingSettings.copy(event.getAttributes()));

            ArrayList<Object> iteration = new ArrayList<>();
            iteration.add(result.getAttributes());

            while (!iteration.isEmpty()) {
                Object next = iteration.get(0);
                if (isMap(next)) {
                    Map nextAsMap = (Map) next;
                    Set mapKeys = nextAsMap.keySet();
                    for (Object key : mapKeys) {
                        Object value = nextAsMap.get(key);
                        if (isMap(value) || isList(value)) {
                            iteration.add(value);
                        } else {
                            Object dataValue = getVariableValue(context, value.toString());
                            replaceDataKeyWithValue(nextAsMap, key.toString(), dataValue);
                        }
                    }
                } else if (isList(next)) {
                    List nextAsList = (List) next;
                    for (Object entry : new ArrayList<>(nextAsList)) {
                        if (isMap(entry) || isList(entry)) {
                            iteration.add(entry);
                        } else {
                            Object dataValue = getVariableValue(context, entry.toString());
                            replaceDataKeyWithValue(nextAsList, entry.toString(), dataValue);
                        }
                    }
                }
                iteration.remove(next);
            }
            exporter.exportEvent(result);
        }
    }

    @Override
    public String getName() {
        return "Event Recorder";
    }

    /**
     * Attempts to retrieve the value to a data key.
     * Returns null if the data keys actual value is not set
     * or no VariableAccessor has been created for this data key in {@link rocks.inspectit.ocelot.core.instrumentation.hook.MethodHookGenerator}.
     *
     * @param context : The Execution context of the current execute call.
     * @param dataKey : The data key mentioned within the instrumentation and a VariableAccessor should be available.
     * @return : The value to the coresponding data key or null.
     */
    private Object getVariableValue(ExecutionContext context, String dataKey) {
        try {
            VariableAccessor valueAccessor = valueAccessors.get(dataKey);
            return valueAccessor.get(context);
        } catch (NullPointerException ex){
            log.error("No Accessor has been found for data key: " + dataKey);
            return null;
        }
    }

    private void replaceDataKeyWithValue(Object parent, String key, Object value){
        if(value == null){
            //TODO Deleting keys results in ConcurrentModifcationErrors.
//            if(parent instanceof Map) {
//                Map parentAsMap = (Map) parent;
//                parentAsMap.remove(key);
//            } else if (parent instanceof List) {
//                List parentAsList = (List) parent;
//                parentAsList.remove(key);
//            }
            return;
        }

        if(parent instanceof Map) {
            Map parentAsMap = (Map) parent;
            parentAsMap.replace(key, value);
        } else if (parent instanceof List) {
            List parentAsList = (List) parent;
            parentAsList.remove(key);
            parentAsList.add(value);
        }
    }

    private boolean isMap(Object obj) {
        return  obj instanceof Map;
    }

    private boolean isList(Object obj) {
        return obj instanceof List;
    }
}
