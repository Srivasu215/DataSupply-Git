let CommonFromData = require("../../../../PullData/FromData");
let CommonFromConfig = require("../../../../PullData/FromConfig");

let StartFunc = async ({ inDataPK, inFolderName, inFileNameWithExtension }) => {
    let LocalDataPK = inDataPK;
    let LocalJsonFileData = await CommonFromData.AsJsonAsyncFromFolderAndFile({
        inFolderName,
        inFileNameWithExtension, inUserPK: LocalDataPK
    });

    let LocalConfigData = await CommonFromConfig.FromFolderAndFile({
        inFolderName, inFileNameWithExtension,
        inUserPK: LocalDataPK
    });
    
    let LocalReturnObject = {};

    Object.entries(LocalJsonFileData).forEach(
        ([key, value]) => {
            LocalReturnObject[key] = {
                ItemName: key,
                RowCount: Object.keys(value).length,
                ScreenCount: Object.keys(LocalConfigData[key]).length
            };
        });

    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await StartFunc({
        inDataPK: 1022,
        inFolderName: "Masters",
        inFileNameWithExtension: "Products.json"
    });

    console.log("LocalMockFunc : ", LocalData);
};

// LocalMockFunc().then(P => {
// });

module.exports = {
    StartFunc
};