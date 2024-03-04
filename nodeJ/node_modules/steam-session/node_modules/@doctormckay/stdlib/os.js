"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataDirectory = void 0;
const path_1 = require("path");
function appDataDirectory(params) {
    if (!params.appName || !params.appAuthor) {
        throw new Error('appName and appAuthor are required');
    }
    switch (params.platform || process.platform) {
        case 'darwin':
            if (process.env.HOME) {
                return (0, path_1.join)(process.env.HOME, 'Library', 'Application Support', params.appName);
            }
            // No HOME env var
            return null;
        case 'win32':
            let appDataVar = params.useRoaming ? 'APPDATA' : 'LOCALAPPDATA';
            let basePath = process.env[appDataVar] || process.env.APPDATA;
            if (basePath) {
                return (0, path_1.join)(basePath, params.appAuthor, params.appName);
            }
            // No APPDATA or LOCALAPPDATA env var
            return null;
        default:
            if (process.env.XDG_DATA_HOME) {
                return (0, path_1.join)(process.env.XDG_DATA_HOME, params.appName);
            }
            else if (process.env.HOME) {
                return (0, path_1.join)(process.env.HOME, '.local', 'share', params.appName);
            }
            else {
                // No XDG_DATA_HOME or HOME env var
                return null;
            }
    }
}
exports.appDataDirectory = appDataDirectory;
const OS = {
    appDataDirectory
};
exports.default = OS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBCO0FBSzFCLFNBQVMsZ0JBQWdCLENBQUMsTUFBOEI7SUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztLQUN0RDtJQUVELFFBQVEsTUFBTSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQzVDLEtBQUssUUFBUTtZQUNaLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRjtZQUVELGtCQUFrQjtZQUNsQixPQUFPLElBQUksQ0FBQztRQUViLEtBQUssT0FBTztZQUNYLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ2hFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDOUQsSUFBSSxRQUFRLEVBQUU7Z0JBQ2IsT0FBTyxJQUFBLFdBQUksRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEQ7WUFFRCxxQ0FBcUM7WUFDckMsT0FBTyxJQUFJLENBQUM7UUFFYjtZQUNDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7Z0JBQzlCLE9BQU8sSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVCLE9BQU8sSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ04sbUNBQW1DO2dCQUNuQyxPQUFPLElBQUksQ0FBQzthQUNaO0tBQ0Y7QUFDRixDQUFDO0FBT0EsNENBQWdCO0FBTGpCLE1BQU0sRUFBRSxHQUFjO0lBQ3JCLGdCQUFnQjtDQUNoQixDQUFDO0FBTUYsa0JBQWUsRUFBRSxDQUFDIn0=