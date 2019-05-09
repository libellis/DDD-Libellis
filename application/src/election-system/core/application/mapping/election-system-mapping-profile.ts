import 'automapper-ts';

// TODO: Figure out how to centralize all mappings and run them here only?
// Can't seem to export automapper since it's a singleton that's not declared here :-(

automapper
    .createMap('masterBallot', 'masterBallotResponse')
    .forMember('questions', function (opts) { opts.mapFrom('_questions'); });
