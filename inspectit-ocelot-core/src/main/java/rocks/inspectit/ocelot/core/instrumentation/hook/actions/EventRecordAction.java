package rocks.inspectit.ocelot.core.instrumentation.hook.actions;

import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import rocks.inspectit.ocelot.config.model.instrumentation.rules.EventRecordingSettings;
import rocks.inspectit.ocelot.core.instrumentation.hook.VariableAccessor;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * THESIS-TAG: Added the class: Will be called whenever an event should be created. Execute should transform the event then along with the available data
 */

@Slf4j
@Value
public class EventRecordAction implements IHookAction {

    Collection<EventRecordingSettings> events;

    Map<String, VariableAccessor> valueAccessors;

    /**
     * TODO-THESIS: Depending which exporter should be used the format needs to look different....
     * TODO: Transform Event to plain JSON for starters and log to console
     * TODO: Instrumentation is currently overwritten! Bad code. really bad code.
     */
//    @Override
//    public void execute(ExecutionContext context) {
//        for(EventRecordingSettings event : events) {
//            // Creating new event -- start
//            Map<String, Object> result = new HashMap<>();
//            result.put("event", event.getEvent());
//            result.put("attributes", copy(event.getAttributes()));
//
//
//            ArrayList<Map> mapList = new ArrayList();
//            mapList.add( (Map) result.get("attributes"));
//            // Iterating through every Map.
//            while(!mapList.isEmpty()) {
//                Map current = mapList.get(0);
//                Set keysCurrent = current.keySet();
//
//                for(Object key : keysCurrent) {
//                    Object value = current.get(key);
//                    if(value instanceof Map) {
//                        // If the keys resemble a list - the map will be replaced with a list
//                        Map valueAsMap = (Map) value;
//                        Set keysValueMap = valueAsMap.keySet();
//                        boolean isList = isList(keysValueMap);
//
//                        if(isList) {
//                            List listValues = new ArrayList(valueAsMap.values());
//
//                            // The values of the list have to be checked for being a map as well and either added to the list/ or the value replaced
//                            for(Object dummy : new ArrayList(listValues)) {
//                                if(dummy instanceof Map){
//                                    mapList.add((Map) dummy);
//                                } else {
//                                    Object dataValue = getVariableValue(context, dummy.toString());
//                                    if(dataValue != null) {
//                                        listValues.remove(dummy);
//                                        listValues.add(dataValue);
//                                    }
//                                }
//                            }
//                            current.replace(key, listValues);
//                        } else {
//                            //if it's not a list, the map will be added to the list
//                            mapList.add(valueAsMap);
//                        }
//                    } else {
//                        Object dataValue = getVariableValue(context, value.toString());
//                        if(dataValue != null) {
//                            current.replace(key, dataValue);
//                        }
//                    }
//                }
//
//                mapList.remove(current);
//            }
//            System.out.println("Printing Event");
//            System.out.println(result);
//        }
//    }

    @Override
    public void execute(ExecutionContext context) {
        for(EventRecordingSettings event : events) {
            Map<String, Object> result = new HashMap<>();
            result.put("event", event.getEvent());
            result.put("attributes", EventRecordingSettings.copy(event.getAttributes()));
            ArrayList<Object> iteration = new ArrayList<>();
            iteration.add(result.get("attributes"));

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
            System.out.println("Printing Event");
            System.out.println(result);
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


    /**
     * Bunch of functions I don't not yet they belong here
     * ________________________________________________________________________________________________________________
     */

    /**
     *
     */

    /**
     * found here : http://javatechniques.com/blog/faster-deep-copies-of-java-objects/ --- apparently slow? TODO: find a better way for a copy --> read further
     * @param orig
     * @return
     */
    //TODO: An umdofiable map will be copied as an unmodifiable map -_-
    public static Object copy(Object orig) {
        Object obj = null;
        try {
            // Write the object out to a byte array
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(bos);
            out.writeObject(orig);
            out.flush();
            out.close();

            // Make an input stream from the byte array and read
            // a copy of the object back in.
            ObjectInputStream in = new ObjectInputStream(
                    new ByteArrayInputStream(bos.toByteArray()));
            obj = in.readObject();
        }
        catch(IOException e) {
            e.printStackTrace();
        }
        catch(ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
        }
        return obj;
    }


    /**
     * When declaring a list in yaml within the instrumentation, it will be resolved to a map
     * with the key being a number and the value being the actual object.
     * Before exporting the event, these unwanted maps should be resolved to a List.
     *
     * @param keys : The collection to check.
     * @return : True if "keys" only consists of numbers from 0 to n.
     */
    private boolean isList(Collection keys) {
        for(int i = 0; i < keys.size(); i++) {
            if(!keys.contains(Integer.toString(i))) {
                return false;
            }
        }
        return true;
    }
}
