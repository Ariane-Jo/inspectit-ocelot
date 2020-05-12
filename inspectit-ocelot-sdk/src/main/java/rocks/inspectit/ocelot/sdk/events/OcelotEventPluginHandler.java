package rocks.inspectit.ocelot.sdk.events;

import java.util.Collection;

/**
 * Registered EventHandlers will receive events for exporting.
 */
public abstract class OcelotEventPluginHandler {

    /**
     * Export function will receive a collection of event-objects periodically.
     */
    public abstract void export(Collection<Event> events);
}
