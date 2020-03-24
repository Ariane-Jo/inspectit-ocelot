package rocks.inspectit.ocelot.sdk.events;

import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
public class EventExporter {
    private Queue<Object> eventQueue = new LinkedList<>();

    private static Map<String, EventHandler> exporters = new HashMap<>();

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

    public void exportEvent(Object eventObj) {
        eventQueue.add(eventObj);

        /** TODO-THESIS: Need to use some kind of timer for this instead... */
        export();
    }

    private void export() {
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
