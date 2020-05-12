package rocks.inspectit.ocelot.sdk.events;

import lombok.Data;

import java.util.Map;

@Data
public class Event {
    String name;

    Long timestamp;

    Map<String, Object> attributes;
}
