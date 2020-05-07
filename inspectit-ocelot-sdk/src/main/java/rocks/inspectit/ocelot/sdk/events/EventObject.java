package rocks.inspectit.ocelot.sdk.events;

import lombok.Data;

import java.util.Map;

@Data
public class EventObject {

    String name;

    Map<String, Object> attributes;
}
