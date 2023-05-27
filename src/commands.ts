enum CommandPermissions {
   player = 0,
   dev = 1
};

interface CommandParameter {
   readonly id: number;
   readonly prompt: string | null;
   readonly dataType: "string" | "number" | null;
}

export interface CommandSpecifications {
   readonly name: string;
   readonly parameters: ReadonlyArray<CommandParameter>;
   readonly configurations: ReadonlyArray<CommandConfiguration>;
}

interface CommandConfiguration {
   readonly parameterConfigurations: ReadonlyArray<number>;
   readonly permissions: CommandPermissions;
}

type Commands = ReadonlyArray<CommandSpecifications>;

const COMMANDS: Commands = [
   /*
   Command to kill a player.
   */
   {
      name: "kill",
      parameters: [
         {
            id: 1,
            prompt: null,
            dataType: "string"
         }
      ],
      configurations: [
         { // Command for player to kill themselves
            parameterConfigurations: [],
            permissions: CommandPermissions.player
         },
         { // Command to kill a specific player
            parameterConfigurations: [1],
            permissions: CommandPermissions.dev
         }
      ]
   },
   /*
   Command to deal damage to a player.
   */
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
            permissions: CommandPermissions.dev
         },
         { // Command for player to damage a specific player
            parameterConfigurations: [2, 1],
            permissions: CommandPermissions.dev
         }
      ]
   },
   /*
   Command to heal a player.
   */
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
            permissions: CommandPermissions.dev
         },
         { // Command for player to heal a specific player
            parameterConfigurations: [2, 1],
            permissions: CommandPermissions.dev
         }
      ]
   },
   /*
   Command to give an item to a player.
   */
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
            permissions: CommandPermissions.dev
         }
      ]
   },
   /*
   Command to play a quack sound.
   */
   {
      name: "quack",
      parameters: [],
      configurations: [
         {
            parameterConfigurations: [],
            permissions: CommandPermissions.player
         }
      ]
   },
   /*
   Command to summon entities.
   */
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
            permissions: CommandPermissions.dev
         }
      ]
   }
];

export default COMMANDS;

const userHasPermissions = (requiredPermissions: CommandPermissions, permissions: CommandPermissions): boolean => {
   switch (permissions) {
      case CommandPermissions.dev:
         return true;
      case CommandPermissions.player:
         return requiredPermissions === CommandPermissions.player;
   }
}

const commandComponentMatchesParameter = (commandComponent: string | number, parameter: CommandParameter): boolean => {
   // Make sure the data type matches
   switch (parameter.dataType) {
      case "number":
         if (typeof commandComponent !== "number") return false;
         break;
      case "string":
         if (typeof commandComponent !== "string") return false;
         break;
   }

   return true;
}

/**
 * Checks whether the given command is valid or not.
 * @param commandComponents 
 * @param permissions 
 * @returns 
 */
export function consoleCommandIsValid(commandComponents: Array<string | number>, permissions: CommandPermissions): boolean {
   // Find the command
   let command: CommandSpecifications | null = null;
   for (const currentCommand of COMMANDS) {
      if (currentCommand.name === commandComponents[0]) {
         command = currentCommand;
         break;
      }
   }

   // If there is no matching command, it isn't valid
   if (command === null) return false;

   // See if there is a configuration of parameters which matches the command
   for (const configuration of command.configurations) {
      // Skip if the user doesn't have the required permissions
      if (!userHasPermissions(configuration.permissions, permissions)) return false;
      
      // Check each parameter in the command
      for (const parameterID of configuration.parameterConfigurations) {
         // Find the corresponding parameter
         let parameter: CommandParameter | null = null;
         for (const currentParameter of command.parameters) {
            if (currentParameter.id === parameterID) {
               parameter = currentParameter;
               break;
            }
         }
         
         if (parameter === null) throw new Error("Couldn't find the corresponding parameter!");

         if (!commandComponentMatchesParameter(commandComponents[parameterID], parameter)) {
            return false;
         }
      }
   }
   
   return true;
}

/**
 * Parses a console command into its components.
 * @param command The command to parse.
 * @returns The command's components.
 */
export function parseConsoleCommand(command: string): Array<string | number> {
   // Split the command
   let commandComponents: Array<string | number> = command.split(" ");

   // Number-ise any numbers
   commandComponents = commandComponents.map(component => !isNaN ? Number(component) : component);

   return commandComponents;
}