
// powerUps.test.js
import {
    freezeTeam,
    meterOff,
    invisible,
    reverseFreezeTeam,
    skipLocation,
    addLocation,
    mysteryCard,
    nextClue,
    gethint,
} from '../controllers/game-controllers';

import {
    rtGetTeamData,
    rtUpdateTeamData,
    rtGetClueData,
} from '../models';

jest.mock('../models', () => ({
    rtGetTeamData: jest.fn(),
    rtUpdateTeamData: jest.fn(),
    rtGetClueData: jest.fn(),
}));

describe('gethint function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should provide hint1 when available and enough balance', async () => {
        const teamID = 'exampleTeamID';
        const teamData = {
            teamID,
            balance: 50, // Assuming enough balance
            hint1: -999, // Available hint1 indicator
        };

        const mockClueData = {
            clue: 'This is a clue',
            hint1: 'Hint 1: This is a hint',
            hint1Type: 'Text',
            hint2: 'Hint 2: Another hint',
            hint2Type: 'Text',
        };

        // Mocking database functions to return specific data
        rtGetTeamData.mockResolvedValue(teamData);
        rtGetClueData.mockResolvedValue(mockClueData);

        const req = {
            body: {
                teamID,
            },
        };

        const res = {
            json: jest.fn(),
        };

        await gethint(req, res);

        // Check if rtUpdateTeamData is called with the updated hint1 and reduced balance
        expect(rtUpdateTeamData).toHaveBeenCalledWith(teamID, {
            balance: teamData.balance - 20, // Assuming hint1 costs 20 units
            hint1: mockClueData.hint1,
            hint1Type: mockClueData.hint1Type,
        });

        // Check if the response is as expected
        expect(res.json).toHaveBeenCalledWith({
            status: '1',
            message: 'Hint 1',
            hint: {
                hint: mockClueData.hint1,
                hintType: mockClueData.hint1Type,
            },
        });
    });

    test('should provide hint2 when available and enough balance', async () => {
        const teamID = 'exampleTeamID';
        const teamData = {
            teamID,
            balance: 60, // Assuming enough balance
            hint1: 999, // Unavailable hint1 indicator
            hint2: -999, // Available hint2 indicator
        };

        const mockClueData = {
            clue: 'This is a clue',
            hint1: 'Hint 1: This is a hint',
            hint1Type: 'Text',
            hint2: 'Hint 2: Another hint',
            hint2Type: 'Text',
        };

        // Mocking database functions to return specific data
        rtGetTeamData.mockResolvedValue(teamData);
        rtGetClueData.mockResolvedValue(mockClueData);

        const req = {
            body: {
                teamID,
            },
        };

        const res = {
            json: jest.fn(),
        };

        await gethint(req, res);

        // Check if rtUpdateTeamData is called with the updated hint1 and reduced balance
        expect(rtUpdateTeamData).toHaveBeenCalledWith(teamID, {
            balance: teamData.balance - 40, // Assuming hint1 costs 20 units

            hint2: mockClueData.hint2,
            hint2Type: mockClueData.hint2Type,
        });

        // Check if the response is as expected
        expect(res.json).toHaveBeenCalledWith({
            status: '1',
            message: 'Hint 2',
            hint: {
                hint: mockClueData.hint2,
                hintType: mockClueData.hint2Type,
            },
        });
    });
    
    test('should return insufficient points if there is not enough balance', async () => {
        const teamID = 'exampleTeamID';
        const teamData = {
            teamID,
            balance: 10, // Assuming insufficient balance
            hint1: -999, // Available hint1 indicator
        };

        // Mocking database functions to return specific data
        rtGetTeamData.mockResolvedValue(teamData);

        const req = {
            body: {
                teamID,
            },
        };

        const res = {
            json: jest.fn(),
        };

        await gethint(req, res);

        // Check if rtUpdateTeamData is not called due to insufficient balance
        expect(rtUpdateTeamData).not.toHaveBeenCalled();

        // Check if the response indicates insufficient points
        expect(res.json).toHaveBeenCalledWith({
            status: '0',
            message: 'Insufficient points, or you have already used both hints.',
        });
    });

    test('should return all hints called', async () => {
        const teamID = 'exampleTeamID';
        const teamData = {
            teamID,
            balance: 10, // Assuming insufficient balance
            hint1: 999, // Unavailable hint1 indicator
            hint2: 999, // Unavailable hint2 indicator
        };

        // Mocking database functions to return specific data
        rtGetTeamData.mockResolvedValue(teamData);

        const req = {
            body: {
                teamID,
            },
        };

        const res = {
            json: jest.fn(),
        };

        await gethint(req, res);

        // Check if rtUpdateTeamData is not called due to insufficient balance
        expect(rtUpdateTeamData).not.toHaveBeenCalled();

        // Check if the response indicates insufficient points
        expect(res.json).toHaveBeenCalledWith({
            status: '0',
            message: 'Insufficient points, or you have already used both hints.',
        });
    });
});

describe('nextClue function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should progress to the next clue and provide new clue data', async () => {
        const teamID = 'exampleTeamID';
        const teamData = {
            teamID,
            currentClueIndex: 3,
            previousClueSolvedAtTime: 1638417600000, // Assuming a timestamp
            balance: 100, // Assuming enough balance
        };

        const mockClueData = {
            clue: 'This is a clue',
            clueType: 'Text',
        };

        // Mocking database functions to return specific data
        rtGetTeamData.mockResolvedValue(teamData);
        rtGetClueData.mockResolvedValue(mockClueData);

        const req = {
            body: {
                teamID,
                askTimestamp: 1638417700000, // A timestamp for the next clue request
            },
        };

        const res = {
            json: jest.fn(),
        };

        await nextClue(req, res);

        // Check if team's data is updated with the next clue's index and timestamp
        expect(rtUpdateTeamData).toHaveBeenCalledWith(teamID, {
            currentClueIndex: teamData.currentClueIndex + 1,
            previousClueSolvedAtTime: req.body.askTimestamp,
            balance: teamData.balance + expect.any(Number), // Assuming points are added
        });

        // Check if the response contains the new clue data
        expect(res.json).toHaveBeenCalledWith({
            status: '1',
            message: 'Clue Data',
            clueData: {
                clue: mockClueData.clue,
                clueType: mockClueData.clueType,
            },
        });
    });

    // Add more test cases for edge cases and different scenarios
});