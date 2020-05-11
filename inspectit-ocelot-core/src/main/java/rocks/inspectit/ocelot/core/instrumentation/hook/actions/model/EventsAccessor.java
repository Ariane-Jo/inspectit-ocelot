package rocks.inspectit.ocelot.core.instrumentation.hook.actions.model;

import lombok.Value;
import rocks.inspectit.ocelot.core.instrumentation.hook.VariableAccessor;

import java.util.Map;

/**
 * Contains the information and tags/value accessors for an event.
 */
@Value
public class EventsAccessor {
    /**
     * Event name.
     */
    private final String name;

    /**
     * Event attributes Map.
     */
    private final Map<String, Object> attributes;

    /**
     * Event attributes value variable accessors.
     */
    private final VariableAccessor variableAccessor;

    /**
     * Constant tags keys and values.
     */
    private final Map<String, String> constantTags;

}
