package rocks.inspectit.ocelot.core.instrumentation.hook.actions;

import lombok.Value;
import rocks.inspectit.ocelot.config.model.instrumentation.rules.EventRecordingSettings;
import rocks.inspectit.ocelot.core.instrumentation.hook.VariableAccessor;

import java.util.Collection;
import java.util.Map;

@Value
public class EventsRecorder implements IHookAction {

    private Collection<EventRecordingSettings> events;

    private Map<String, VariableAccessor> valueAccessors;

    @Override
    public void execute(ExecutionContext context) {
        for(EventRecordingSettings event: events){
            // Not doing anything
        }
    }

    @Override
    public String getName() {
        return "Events Recorder";
    }
}
