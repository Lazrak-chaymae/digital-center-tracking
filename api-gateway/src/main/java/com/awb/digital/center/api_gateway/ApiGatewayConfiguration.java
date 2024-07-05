package com.awb.digital.center.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Configuration
public class ApiGatewayConfiguration {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){

        return builder.routes()
                .route(p -> p.path("/api/businesskpis/**")
                        .filters(f -> f.rewritePath("/api/businesskpis/(?<segment>.*)", "/api/businesskpis/${segment}"))
                        .uri("lb://kpi-business-service"))
                .route(p -> p.path("/api/auth/**")
                        .filters(f -> f.rewritePath("/api/auth/(?<segment>.*)", "/api/auth/${segment}"))
                        .uri("lb://authentication-service"))
                .route(p -> p.path("/api/dependency/**")
                        .filters(f -> f.rewritePath("/api/dependency/(?<segment>.*)", "/api/dependency/${segment}"))
                        .uri("lb://dependency-service"))
                .route(p -> p.path("/api/projects/**")
                        .filters(f -> f.rewritePath("/api/projects/(?<segment>.*)", "/api/projects/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/release/**")
                        .filters(f -> f.rewritePath("/api/release/(?<segment>.*)", "/api/release/${segment}"))
                        .uri("lb://release-service"))
                .route(p -> p.path("/api/support/**")
                        .filters(f -> f.rewritePath("/api/support/(?<segment>.*)", "/api/support/${segment}"))
                        .uri("lb://support-service"))
                .route(p -> p.path("/api/technical-debt/**")
                        .filters(f -> f.rewritePath("/api/technical-debt/(?<segment>.*)", "/api/technical-debt/${segment}"))
                        .uri("lb://technical-debt-service"))
                .build();
    }
}
