let CommonPullData = require("../../../../../PullData/FromConfigFolder/FromPrintFilesJson/AsJson");

let ReturnArray = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inFolderName;
        let LocalItemName = inItemName;
        let LocalScreenName = inScreenName;

        LocalOriginalData = await CommonPullData.FromFoldFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension,
            inDataPK
        });
        
        if (LocalOriginalData.KTF === false) {
            LocalReturnObject.KReason = LocalOriginalData.KReason;
            return await LocalReturnObject;
        };

        if ((LocalItemName in LocalOriginalData.JsonData) === false) {
            LocalReturnObject.KReason = `Item Name : ${LocalItemName} not found in JsonData!`;
            return await LocalReturnObject;
        };

        if ((LocalScreenName in LocalOriginalData.JsonData[LocalItemName]) === false) {
            LocalReturnObject.KReason = `Screen Name : ${LocalScreenName} not found in Item Name : ${LocalItemName}`;
            return await LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
        LocalReturnObject.DataFromServer = LocalOriginalData.JsonData[LocalItemName][LocalScreenName];
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await ReturnArray({
        inFolderName: "Transactions",
        inFileNameWithExtension: "General Payments.json",
        inItemName: "General Payments",
        inScreenName: "Print",
        inDataPK: 1018
    });
};


let MockFuncFromFolderFile1 = async () => {
    return await ReturnArray({
        inFolderName: "Masters",
        inFileNameWithExtension: "Customers.json",
        inItemName: "CustomerNames",
        inItemName: "General Payments",
        inDataPk: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    ReturnArray
};