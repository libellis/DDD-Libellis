# DDD-Libellis
[![Build Status](https://travis-ci.org/libellis/DDD-Libellis.svg?branch=master)](https://travis-ci.org/libellis/DDD-Libellis)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Introduction
Libellis is a ranked voting application with a simple API for users to create, share, and vote on surveys, where each survey question would effictively be a poll.

## Why Re-Write?
This version of Libellis seeks to be written from the ground up with a cohesive and rich domain model, and implement CQRS + Event Sourcing
for vote aggregation.  

## Table of Contents
1. [Domain Model](#Domain-Model)
2. [Setup](#Setup)

## Domain Model

### Bounded Contexts

There are currently two bounded contexts: Election System, and User Management.  There is one overlapping concept between these two bounded contexts.  In the User Management context a User will have various details about them, such as their first and last name, email address, and other relevant fields.  In the context of keeping track of our users, this is important information.  

However, once we enter the core domain which is represented by the Election System bounded context, the only piece of data we need about the user is their global identity (UUID assigned at creation).  In the context of the election system they are a voter, not a user - however both bounded contexts will share the same id because there clearly is an overlap.  A user becomes a voter by engaging in an election.

### Core Domain

The core domain for this project is represented by the election system bounded context.  This bounded context handles all of the core business logic related to handling the election and voting process.

Before we can start an election we need some sort of Master Ballot.  In this context a master ballot would contain all of the questions being voted on, with all of the valid choices a voter could pick between.

![Master Ballot Aggregate](Master%20Ballot%20Aggregate.png)

An election is started with a master ballot, and a valid election period.  The election period designates a start time and end time.  The election is automatically started after the start time, and closed upon the ending time.

The flow of data is that a voter will cast their ballot data with the Election.  The Election will validate that their ballot matches up with the master ballot, and enforce other business rules.  Upon successful validation, a ballot is created and "cast" by issuing a BallotCastEvent.  This event is sent down a BallotCastEventStream (Reactive event stream) and is subscribed to by the "Teller."  

A Teller in any election is the person that counts the votes.  This system tallies the votes as they come in.  It is under the direct control of the Election aggregate root, and therefore the election results are restricted until the election period has concluded, at which point the results are accessible via the Election aggregate root entity.

![Election System Data Flow](Election%20System%20Data%20Flow%20Diagram.png)

## Setup

To build the project, simply run `make docker-build` from the root directory.  For now there is no web api layer for endpoint testing, or manual interaction with the application. 

This will build your docker container.  In development you will also want to run
`npm install` from the `/application` directory to locally install node_modules.
This will give you typescript support in most modern IDEs and enforce project
specific rules.

## Tests

You can run tests by running `make docker-test` from the root directory.  This
will run all tests from inside of the docker container that got built in the
last step.

## Cleaning up Containers

If you need to clean up libellis api containers, just run `make docker-clean`.  If you would like to deep clean all of your docker images you can use `make docker-deep-clean`.
