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
                .route(p -> p.path("/api/projects/**")
                        .filters(f -> f.rewritePath("/api/projects/(?<segment>.*)", "/api/projects/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/todos/**")
                        .filters(f -> f.rewritePath("/api/todos/(?<segment>.*)", "/api/todos/${segment}"))
                        .uri("lb://todo-service"))
                .route(p -> p.path("/api/phases/**")
                        .filters(f -> f.rewritePath("/api/phases/(?<segment>.*)", "/api/phases/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/tasks/**")
                        .filters(f -> f.rewritePath("/api/tasks/(?<segment>.*)", "/api/tasks/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/etapes/**")
                        .filters(f -> f.rewritePath("/api/etapes/(?<segment>.*)", "/api/etapes/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/squads/**")
                        .filters(f -> f.rewritePath("/api/squads/(?<segment>.*)", "/api/squads/${segment}"))
                        .uri("lb://project-service"))
                .route(p -> p.path("/api/auth/**")
                        .filters(f -> f.rewritePath("/api/auth/(?<segment>.*)", "/api/auth/${segment}"))
                        .uri("lb://authentification-service"))
                .route(p -> p.path("/api/business-kpis/**")
                        .filters(f -> f.rewritePath("/api/business-kpis/(?<segment>.*)", "/api/business-kpis/${segment}"))
                        .uri("lb://dashboard-service"))
                .route(p -> p.path("/api/dependencies/**")
                        .filters(f -> f.rewritePath("/api/dependencies/(?<segment>.*)", "/api/dependencies/${segment}"))
                        .uri("lb://dashboard-service"))
                .route(p -> p.path("/api/releases/**")
                        .filters(f -> f.rewritePath("/api/releases/(?<segment>.*)", "/api/releases/${segment}"))
                        .uri("lb://dashboard-service"))
                .route(p -> p.path("/api/supports/**")
                        .filters(f -> f.rewritePath("/api/supports/(?<segment>.*)", "/api/supports/${segment}"))
                        .uri("lb://dashboard-service"))
                .route(p -> p.path("/api/technical-debts/**")
                        .filters(f -> f.rewritePath("/api/technical-debts/(?<segment>.*)", "/api/technical-debts/${segment}"))
                        .uri("lb://dashboard-service"))
                .build();
    }
}
