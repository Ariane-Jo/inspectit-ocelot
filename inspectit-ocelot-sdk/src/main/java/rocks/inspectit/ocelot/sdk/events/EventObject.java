package rocks.inspectit.ocelot.sdk.events;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Map;

@Data
public class EventObject {

    String name;

    Long timestamp;

    Map<String, Object> attributes;
}
