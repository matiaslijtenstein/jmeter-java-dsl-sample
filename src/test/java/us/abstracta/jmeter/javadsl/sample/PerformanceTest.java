package us.abstracta.jmeter.javadsl.sample;

import static org.assertj.core.api.Assertions.assertThat;
import static us.abstracta.jmeter.javadsl.JmeterDsl.*;
import static us.abstracta.jmeter.javadsl.dashboard.DashboardVisualizer.*;


import java.io.IOException;
import java.io.File;
import org.apache.commons.io.FileUtils;

import java.time.Duration;
import org.junit.jupiter.api.Test;
import us.abstracta.jmeter.javadsl.core.TestPlanStats;


public class PerformanceTest {
    private static final String apikey = "d811d671617be19a93a16e2092514209";


    @Test
    
  public void testPerformanceWithRpsThreadGroupsReq11 () throws IOException{
    String reportDir = "./report/testPerformanceWithRpsThreadGroupsReq11";
    FileUtils.deleteDirectory(new File(reportDir));

    TestPlanStats stats = testPlan(
        rpsThreadGroup()
            .maxThreads(500)
            .rampToAndHold(20, Duration.ofSeconds(10), Duration.ofSeconds(60))
            .children(httpSampler("http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/purchases/645095e136fe9b309070fa00").param("startDate", "2023-01-01").param("endDate", "2023-04-01").header("Authorization", apikey)),
            htmlReporter(reportDir),
            dashboardVisualizer()
            ).run();
            assertThat(stats.overall().sampleTimePercentile99()).isLessThan(Duration.ofMillis(300));
  }

    @Test
  public void testPerformanceWithRpsThreadGroupsReq10() throws IOException{
    String reportDir = "./report/testPerformanceWithRpsThreadGroupsReq10";
    FileUtils.deleteDirectory(new File(reportDir));

    TestPlanStats stats = testPlan(
        rpsThreadGroup()
            .maxThreads(500)
            .rampToAndHold(20, Duration.ofSeconds(10), Duration.ofSeconds(60))
            .children(httpSampler("http://dev-stock-env.eba-nhzdmizz.us-east-1.elasticbeanstalk.com/sales/bestProducts").header("Authorization", apikey)
            ),
            htmlReporter(reportDir),
            dashboardVisualizer()
            ).run();
            assertThat(stats.overall().sampleTimePercentile99()).isLessThan(Duration.ofMillis(300));

    }
}
