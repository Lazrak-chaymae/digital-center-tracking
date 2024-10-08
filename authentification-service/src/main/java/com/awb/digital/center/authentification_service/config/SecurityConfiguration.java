package com.awb.digital.center.authentification_service.config;

import com.awb.digital.center.authentification_service.security.JwtAuthenticationEntryPoint;
import com.awb.digital.center.authentification_service.security.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfiguration {


    private UserDetailsService userDetailsService;
    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests(
                        (authorize) -> {
                            /*
                            authorize.requestMatchers(HttpMethod.POST, "/api/**")
                                    .hasRole("DeleveryManager");
                            authorize.requestMatchers(HttpMethod.PUT, "/api/**")
                                    .hasRole("DeleveryManager");
                            authorize.requestMatchers(HttpMethod.DELETE, "/api/**")
                                    .hasRole("DeleveryManager");
                            authorize.requestMatchers(HttpMethod.GET, "/api/**")
                                    .hasAnyRole("DeleveryManager","Manager");
                             */

                            authorize.requestMatchers(HttpMethod.GET,"/api/auth/**")
                                    .permitAll();
                            authorize.requestMatchers(HttpMethod.POST,"/api/auth/**")
                                    .permitAll();
                            authorize.requestMatchers(HttpMethod.PATCH,"/api/auth/**")
                                    .permitAll();
                            authorize.requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll();

                            authorize.anyRequest().authenticated();
                        }
                ).httpBasic(Customizer.withDefaults());
        http.exceptionHandling(
                exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint)
        );
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }




















//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf((csrf) -> csrf.disable())
//                .authorizeHttpRequests(
//                        (authorize) -> {
//                            authorize.requestMatchers(HttpMethod.POST,"/api/auth")
//                                    .permitAll();
//                            authorize.requestMatchers(HttpMethod.POST,"/api/user")
//                                    .permitAll();
//                            authorize.anyRequest().permitAll();
//                        }
//                )
//                .httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }



}
