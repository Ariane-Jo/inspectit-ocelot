package rocks.inspectit.ocelot.sdk.events;

import java.util.Collection;

public abstract class EventHandler {

    public abstract void export(Collection<Object> events);
}
