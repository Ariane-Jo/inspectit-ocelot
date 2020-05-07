package rocks.inspectit.ocelot.sdk.events;

import lombok.Data;

import java.util.Map;

@Data
public class EventObject {

    String event;

    Map<String, Object> attributes;
}
