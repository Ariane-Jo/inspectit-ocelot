package rocks.inspectit.ocelot.config.model.instrumentation.rules;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.Map;

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
    private String event;
    /**
     * The Event attributes to be stored.
     * Valid objects can be arrays, nested and any //TODO: What is a possible value - add performValidation Funktion
     */
    @Builder.Default
    @NotNull
    private Map<@NotBlank String, Object> attributes = Collections.emptyMap();
    private Map<String, Object> result;

    /**
     * TODO-THESIS: Decide at which point the attributes shall be converted into the needed format.. especially array has to be created
     * Returns a new instance of EventRecordingSettings, copying the one which calls this function.
     * Sets the event prop, in case it is empty before.
     * Used by the corresponding Resolver of {@link InstrumentationRuleSettings}
     *
     * @param defaultEventName The default name which should be used in case event is null
     * @return EventRecordingSettings
     */
    public EventRecordingSettings copyWithDefaultEventName(String defaultEventName) {
        String eventName = getEventNameOrDefault(defaultEventName);
        return toBuilder().event(eventName)
//                .attributes(Collections.unmodifiableMap(attributes)) //TODO: allowing modifying since needed in eventrecordaction currently. would still be better of unmodifiable....
                .attributes(attributes)
                .build();
    }

    private String getEventNameOrDefault(String defaultEventName) {
        return StringUtils.isEmpty(event) ? defaultEventName : event;
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
