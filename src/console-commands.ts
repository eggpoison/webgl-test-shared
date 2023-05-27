enum ConsolePermissions {
   player = 0,
   dev = 1
};

interface ConsoleCommandParameter {
   readonly id: number;
   readonly prompt: string | null;
   readonly dataType: "string" | "number" | null;
}

export interface ConsoleCommand {
   readonly name: string;
   readonly parameters: ReadonlyArray<ConsoleCommandParameter>;
   readonly configurations: ReadonlyArray<CommandConfiguration>;
}

interface CommandConfiguration {
   readonly parameterConfigurations: ReadonlyArray<number>;
   readonly permissions: ReadonlyArray<ConsolePermissions>;
}

type ConsoleCommands = ReadonlyArray<ConsoleCommand>;

const CONSOLE_COMMANDS: ConsoleCommands = [
   {
      name: "kill",
      parameters: [
         {
            id: 1,
            prompt: null,
            dataType: null
         },
         {
            id: 2,
            prompt: null,
            dataType: "string"
         }
      ],
      configurations: [
         { // Command for player to kill themselves
            parameterConfigurations: [1],
            permissions: [ConsolePermissions.player]
         },
         { // Command to kill a specific player
            parameterConfigurations: [2],
            permissions: [ConsolePermissions.dev]
         }
      ]
   },
   {
      name: "damage",
      parameters: [
         {
            id: 1,
            prompt: null,
            dataType: "number"
         },
         {
            id: 2,
            prompt: null,
            dataType: "string"
         }
      ],
      configurations: [
         { // Command for player to damage themselves
            parameterConfigurations: [1],
            permissions: [ConsolePermissions.dev]
         },
         { // Command for player to damage a specific player
            parameterConfigurations: [2, 1],
            permissions: [ConsolePermissions.dev]
         }
      ]
   },
   {
      name: "heal",
      parameters: [
         {
            id: 1,
            prompt: null,
            dataType: "number"
         },
         {
            id: 2,
            prompt: null,
            dataType: "string"
         }
      ],
      configurations: [
         { // Command for player to heal themselves
            parameterConfigurations: [1],
            permissions: [ConsolePermissions.dev]
         },
         { // Command for player to heal a specific player
            parameterConfigurations: [2, 1],
            permissions: [ConsolePermissions.dev]
         }
      ]
   },
   {
      name: "give",
      parameters: [
         { // Player name
            id: 1,
            prompt: null,
            dataType: "string"
         },
         { // Item type
            id: 2,
            prompt: null,
            dataType: "string"
         }, // Count
         {
            id: 3,
            prompt: null,
            dataType: "number"
         }
      ],
      configurations: [
         {
            parameterConfigurations: [1, 2, 3],
            permissions: [ConsolePermissions.dev]
         }
      ]
   },
   {
      name: "quack",
      parameters: [],
      configurations: [
         {
            parameterConfigurations: [],
            permissions: [ConsolePermissions.player]
         }
      ]
   },
   {
      name: "summon",
      parameters: [
         { // Type of entity to summon
            id: 1,
            prompt: null,
            dataType: "string"
         },
         { // Number of entity to summon
            id: 2,
            prompt: null,
            dataType: "number"
         }
      ],
      configurations: [
         {
            parameterConfigurations: [1, 2],
            permissions: [ConsolePermissions.dev]
         }
      ]
   }
];

export default CONSOLE_COMMANDS;