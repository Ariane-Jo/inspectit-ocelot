package rocks.inspectit.ocelot.rest.agent;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import rocks.inspectit.ocelot.agentconfiguration.AgentConfiguration;
import rocks.inspectit.ocelot.agentconfiguration.AgentConfigurationManager;
import rocks.inspectit.ocelot.agentstatus.AgentStatusManager;

import java.util.HashMap;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AgentControllerTest {

    @InjectMocks
    AgentController controller;

    @Mock
    AgentConfigurationManager configManager;

    @Mock
    AgentStatusManager statusManager;

    @Nested
    public class FetchConfiguration {

        @Test
        public void noMappingFound() throws Exception {
            doReturn(null)
                    .when(configManager).getConfiguration(anyMap());

            HashMap<String, String> attributes = new HashMap<>();
            ResponseEntity<String> result = controller.fetchConfiguration(attributes);

            assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
            verify(statusManager).notifyAgentConfigurationFetched(same(attributes), isNull());
        }

        @Test
        public void mappingFound() throws Exception {
            AgentConfiguration config = new AgentConfiguration(null, "foo : bar");
            doReturn(config)
                    .when(configManager).getConfiguration(anyMap());

            HashMap<String, String> attributes = new HashMap<>();
            ResponseEntity<String> result = controller.fetchConfiguration(attributes);

            assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
            assertThat(result.getBody()).isEqualTo("foo : bar");
            verify(statusManager).notifyAgentConfigurationFetched(same(attributes), same(config));
        }


        @Test
        public void etagPresent() throws Exception {
            doReturn(new AgentConfiguration(null, "foo : bar"))
                    .when(configManager).getConfiguration(anyMap());

            ResponseEntity<String> firstResult = controller.fetchConfiguration(new HashMap<>());
            ResponseEntity<String> secondResult = controller.fetchConfiguration(new HashMap<>());

            assertThat(firstResult.getStatusCode()).isEqualTo(HttpStatus.OK);
            assertThat(firstResult.getBody()).isEqualTo("foo : bar");
            assertThat(secondResult.getStatusCode()).isEqualTo(HttpStatus.OK);
            assertThat(secondResult.getBody()).isEqualTo("foo : bar");
            assertThat(firstResult.getHeaders().getFirst("ETag"))
                    .isNotBlank()
                    .isEqualTo(secondResult.getHeaders().getFirst("ETag"));
        }
    }
}
