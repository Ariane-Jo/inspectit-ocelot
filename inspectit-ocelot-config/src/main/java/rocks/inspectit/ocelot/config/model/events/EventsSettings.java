package rocks.inspectit.ocelot.config.model.events;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * THESIS-TAG: Created this class. Is used within {@link rocks.inspectit.ocelot.config.model.InspectitConfig}
 * Should contain all overall settings for events.
 * * enabled or not
 * * and some specific settings for the exporters which can be used
 */

@Data
@NoArgsConstructor
public class EventsSettings {

    /**
     * Master switch for enabling event recording
     */
    private boolean enabled;

    //Gotta do this within plugins!
    //TODO-THESIS: create XES exporter Class with enabled: true/false + hostAdress: some http path
/**
 * It might be better to enhance the plugin system instead - and send the events through the plugins....
 * Not sure yet what exactly needs to be changed then though, since right not it's not specified through the instrumentation if it's traces or events which will be exported...
 * but through the plugin....
 * I would need to change the opencensus plugin system then -.-....
 * don't do it if it's too much overhead
 */
    //TODO-THESIS: create JSON Exporter Class for Elastic with enabled: true/false + hostAdress: some path
    /**
     * Example:::
     * private ExporterSettings exporter;
     *      private XESSettings xes;
     *          private boolean enabled;
     *          private String host;
     *      private ElasticSettings elastic;
     *          private boolean enabled;
     *          private String host;
     */
}
