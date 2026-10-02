package com.seniorconnect.resource.initializer;

import com.seniorconnect.resource.entity.Resource;
import com.seniorconnect.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ResourceDataInitializer implements CommandLineRunner {

    private final ResourceRepository resourceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (resourceRepository.count() == 0) {
            resourceRepository.saveAll(List.of(
                Resource.builder()
                    .title("Striver SDE Sheet - Top 180 DSA Questions")
                    .description("The ultimate DSA roadmap covering Arrays, Matrix, Linked List, Greedy, Recursion, Backtracking, Trees, Graphs & Dynamic Programming.")
                    .category("DSA").difficulty("Intermediate").tags("DSA, LeetCode, Striver, SDE Sheet").url("https://takeuforward.org/strivers-sde-sheet-top-coding-interview-problems/")
                    .uploaderId(3L).uploaderName("Priya Nair").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(142).build(),

                Resource.builder()
                    .title("System Design Primer by Donne Martin")
                    .description("Comprehensive open-source guide to designing large-scale distributed systems, microservices, load balancers, caching & database indexing.")
                    .category("System Design").difficulty("Advanced").tags("System Design, LLD, HLD, Distributed Systems").url("https://github.com/donnemartin/system-design-primer")
                    .uploaderId(4L).uploaderName("Rohan Gupta").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(98).build(),

                Resource.builder()
                    .title("DBMS Core Interview Handbook & ACID Guarantee")
                    .description("Complete revision guide for Transactions, B+ Trees, Indexing, Normalization (1NF to 3NF), and Isolation levels.")
                    .category("DBMS").difficulty("Beginner").tags("DBMS, SQL, Transactions, Indexing").url("https://github.com/jwasham/coding-interview-university#dbms")
                    .uploaderId(5L).uploaderName("Ananya Verma").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(85).build(),

                Resource.builder()
                    .title("Operating Systems Deep Dive - Deadlocks, Paging & Process Control")
                    .description("Must-know OS interview questions covering Peterson's solution, Banker's algorithm, Virtual Memory, and Page Replacement.")
                    .category("OS").difficulty("Intermediate").tags("OS, Deadlocks, Memory Management, Linux").url("https://www.geeksforgeeks.org/operating-systems/")
                    .uploaderId(3L).uploaderName("Priya Nair").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(76).build(),

                Resource.builder()
                    .title("Computer Networks TCP/IP & Socket Programming Cheat Sheet")
                    .description("Detailed breakdown of 3-Way Handshake, 4-Way Termination, OSI 7 Layers, Subnetting, HTTP/HTTPS vs WebSockets.")
                    .category("CN").difficulty("Intermediate").tags("CN, Networking, TCP/IP, HTTP").url("https://www.interviewbit.com/networking-interview-questions/")
                    .uploaderId(4L).uploaderName("Rohan Gupta").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(64).build(),

                Resource.builder()
                    .title("Object Oriented Programming & SOLID Principles Masterclass")
                    .description("Real-world Java & C++ examples demonstrating Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation & Dependency Inversion.")
                    .category("OOP").difficulty("Beginner").tags("OOP, SOLID, Design Patterns, Java").url("https://refactoring.guru/design-patterns")
                    .uploaderId(6L).uploaderName("Karan Malhotra").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(110).build(),

                Resource.builder()
                    .title("SQL Interview Queries 50 Must Solve Problems")
                    .description("Handpicked SQL questions on Window Functions (ROW_NUMBER, DENSE_RANK), Self Joins, Subqueries & CTEs.")
                    .category("SQL").difficulty("Intermediate").tags("SQL, PostgreSQL, MySQL, Queries").url("https://leetcode.com/studyplan/top-sql-50/")
                    .uploaderId(5L).uploaderName("Ananya Verma").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(92).build(),

                Resource.builder()
                    .title("Spring Boot & Microservices Production Architecture Guide")
                    .description("Official guide on Spring Cloud Gateway, Eureka Service Discovery, OpenFeign REST clients, Spring Security JWT & RabbitMQ.")
                    .category("Spring Boot").difficulty("Advanced").tags("Spring Boot, Microservices, Java, Eureka, Gateway").url("https://spring.io/guides")
                    .uploaderId(3L).uploaderName("Priya Nair").uploaderRole("SENIOR").status("APPROVED").bookmarksCount(88).build()
            ));

            System.out.println(">>> Resource Service Seed Data Initialized Successfully!");
        }
    }
}
