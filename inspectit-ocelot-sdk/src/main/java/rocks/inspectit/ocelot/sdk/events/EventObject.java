package rocks.inspectit.ocelot.sdk.events;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Map;

@Data
public class EventObject {

    String name;

    Timestamp timestamp;

    Map<String, Object> attributes;
}
