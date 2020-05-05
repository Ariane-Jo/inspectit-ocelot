package rocks.inspectit.ocelot.sdk.events;

import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

/**
 * THESIS-TAG: Created this class
 * Takes care of registering and unregistering exporter-handlers as well as queuing events and periodically sending them to exporters.
 *
 * TODO-THESIS: When disabling events in {@link rocks.inspectit.ocelot.config.model.events.EventsSettings} after
 * they have been enabled before, the timerTask will still be executed. Stop that.
 *
 * TODO-THESIS: Consider making a Singleton out of this class?
 */
@Slf4j
public class EventExporterService {
    /** The queue which stores the event objects to be send. */
    private static Queue<EventObject> eventQueue = new LinkedList<>();

    /** Stores registered EventHandlers. */
    private static Map<String, EventHandler> exporters = new HashMap<>();

    /** Scheduler for periodically sending events currently stored in the queue. */
    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    /** The current timerTask executed by the scheduler. */
    private static ScheduledFuture timerTask;

    public EventExporterService() {
        /** Creates a new timerTask for the scheduler only once. */
        if(timerTask == null){
            timerTask = scheduler.scheduleAtFixedRate(() -> export(), 5000, 5000, TimeUnit.MILLISECONDS);
            scheduler.shutdown();

        }
    }

    public static void registerHandler(String name, EventHandler handler) {
        log.info("Registering handler '{}' to event exporters. ", name);
        if(exporters.containsKey(name)) {
            log.error("Failed to register event exporter handler '{}' as a handler with this name is already registered.", name);
            return;
        }
        exporters.put(name, handler);
    }

    public static void unregisterHandler(String name) {
        exporters.remove(name);
    }

    /** Called by {@link rocks.inspectit.ocelot.core.instrumentation.hook.actions.EventRecordAction} whenever an event has been created. */
    public void exportEvent(EventObject eventObj) {
        eventQueue.add(eventObj);
    }

    /** Called by the scheduler to export the currently stored events. */
    private void export() {
        if(eventQueue.isEmpty()){
            return;
        }

        for(Map.Entry<String, EventHandler> entry : exporters.entrySet()) {
            EventHandler handler = entry.getValue();
            try {
                handler.export(eventQueue);
            } catch (Exception ex) {
                String name = entry.getKey();
                log.error("Event exporter handler '{}' threw an error while receiving events and will be removed.", name);
                unregisterHandler(name);
            }
        }
        eventQueue.clear();
    }
}
