package rocks.inspectit.ocelot.sdk.events;

import java.util.Collection;

/**
 * THESIS-TAG: created this file
 *  Handler-abstract which can be registered as an exporter-handler at EventExporterService
 */
public abstract class EventHandler {

    /**
     * Export function will receive a collection of event-objects periodically.
     */
    public abstract void export(Collection<EventObject> events);
}
