package rocks.inspectit.ocelot.core.exporter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rocks.inspectit.ocelot.config.model.InspectitConfig;
import rocks.inspectit.ocelot.config.model.events.EventSettings;
import rocks.inspectit.ocelot.core.service.DynamicallyActivatableService;
import rocks.inspectit.ocelot.sdk.events.Event;

import javax.validation.Valid;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class EventExporterService extends DynamicallyActivatableService {

    /** The queue which stores the event objects to be send. */
    private static Queue<Event> eventQueue = new LinkedList<>();

    @Autowired
    private ScheduledExecutorService executor;

    public EventExporterService() {
        super("events");
    }

    @Override
    protected boolean checkEnabledForConfig(InspectitConfig conf) {
        @Valid EventSettings settings = conf.getEvents();
        return settings.isEnabled()
                && settings.getFrequency() != null;
    }

    @Override
    protected boolean doEnable(InspectitConfig conf) {
        log.info("Starting EventExporter Service");
        try {
            EventSettings settings = conf.getEvents();
            executor.scheduleAtFixedRate(
                    () -> sendToHandlers(),
                    settings.getFrequency().getSeconds(),
                    settings.getFrequency().getSeconds(),
                    TimeUnit.SECONDS);
            return true;
        } catch (Throwable t) {
            log.error("EventExporter Service could not be started.", t);
            return false;
        }
    }

    @Override
    protected boolean doDisable() {
        log.info("Shuttding down EventExporter Service.");
        executor.shutdownNow();
        return true;
    }

    public void export(Event eventObj) {
        if(eventObj != null && !executor.isShutdown()) {
            eventQueue.add(eventObj);
        }
    }

    private void sendToHandlers() {
        if(eventQueue.isEmpty()){
            return;
        }
        // Calling handlers to export events
        eventQueue.clear();
    }
}
