package rocks.inspectit.ocelot.config.model.instrumentation.rules;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.*;
import java.sql.Timestamp;
import java.util.*;

/**
 * THESIS-TAG: Added this class, is used within {@link InstrumentationRuleSettings}
 * contains the information for each event to be recorded.
 * name && attributes
 */

@Builder(toBuilder = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventRecordingSettings {

    /**
     * The Event name --> should be the key name in case of this field being empty
     */
    private String name;

    /**
     * Current timestamp.
     */
    @Builder.Default
    private Long timestamp = System.currentTimeMillis();

    /**
     * The Event attributes to be stored.
     * Valid objects can be arrays, nested and any //TODO: What is a possible value - add performValidation Funktion
     */
    @Builder.Default
    @NotNull
    private Map<@NotBlank String, Object> attributes = Collections.emptyMap();


    //private Map<String, Object> result;

    /**
     * Returns a new instance of EventRecordingSettings, copying the one which calls this function.
     * Sets the event prop, in case it is empty before.
     * Used by the corresponding Resolver of {@link InstrumentationRuleSettings}
     *
     * @param defaultEventName The default name which should be used in case event is null
     * @return EventRecordingSettings
     */
    public EventRecordingSettings copyWithDefaultEventName(String defaultEventName) { //TO DELETE
        String eventName = getEventNameOrDefault(defaultEventName);
        return toBuilder().name(eventName)
                .attributes(attributes)
                .build();
    }

    public EventRecordingSettings copyAndTransformWithDefaultName(String defaultEventName) {
        String eventName = getEventNameOrDefault(defaultEventName);
        return toBuilder().name(eventName)
                .timestamp(timestamp)
                .attributes(transformedAttributes())
                .build();
    }

    private String getEventNameOrDefault(String defaultEventName) {
        return StringUtils.isEmpty(name) ? defaultEventName : name;
    }

    /**
     * Returns a copy of the attributes but turns "ListMaps" in the form of {0="", 1=""}
     * into a List in the form of ["", ""].
     *
     * @return : Map of String/Object including Maps and Lists
     */
    //TODO-THESIS: allowing modifying since needed in eventrecordaction currently. would still be better of unmodifiable....
    private Map<String, Object> transformedAttributes() {
        Map<String, Object> result = (Map) copy(attributes);

        ArrayList<Map> maps = new ArrayList<>();
        maps.add(result);
        /** Iterate through every Map and check if any EntrySet should be a Map of <String, List>. */
        while (!maps.isEmpty()) {
            Map current = maps.get(0);
            Set currentKeys = current.keySet();

            for(Object key : currentKeys) {
                Object currentValue = current.get(key);

                if(currentValue instanceof Map) {
                    Map currentValuesAsMap = (Map) currentValue;
                    boolean isList = isList(currentValuesAsMap.keySet());

                    /** Transform the values to a List; checks whether any value is a Map itself and adds it to the list of maps. */
                    if(isList) {
                        List currentValuesAsList = new ArrayList(currentValuesAsMap.values());
                        for(Object innerValue : new ArrayList(currentValuesAsList)) {
                            if(innerValue instanceof Map){
                                maps.add((Map) innerValue);
                            }
                        }
                        current.replace(key, currentValuesAsList);
                    }
                }
            }
            maps.remove(current);
        }
        return result;
    }

    //TODO-THESIS: The copy method is probably pretty slow - change that.
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

    //TODO-THESIS: Depending on if there is something not validate... Checking if the data variables exists is not possible here? - I think so at least
//    public void performValidation(InstrumentationSettings container, ViolationBuilder vios) {
//        attributes.entrySet().stream()
//                .map(Map.Entry::getKey)
//                .forEach(data -> System.out.println(data));
//
//        attributes.forEach((name, data) -> {
//            System.out.println(name + "-------" + data);
//        });
//    }
}
