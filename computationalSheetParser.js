const textract = require("textract");

const extractDocContent = (filePath) => {
  textract.fromFileWithPath(
    filePath,
    { preserveLineBreaks: true },
    (error, text) => {
      if (error) {
        console.error("Error:", error.message);
      } else {
        // Process the extracted text
        const paragraphs = text
          .split("\n")
          .filter((para) => para.trim() !== "");

        const staticTotalIncome = "Total Income";
        const staticBasicExemption = "Basic Exemption";
        const staticIncomeTax = "Income Tax";
        const staticTaxPaid = "Tax Paid";
        const staticTds = "TDS";
        const staticRefund = "Refund";
        const staticPayable = "Payable";

        let computationSheetObject = {
          totalIncome: null,
          basicExemption: null,
          incomeTax: null,
          taxPaid: null,
          tds: null,
          refund: null,
          payable: null,
        };

        // Convert paragraphs into JSON format
        const jsonData = paragraphs.map((para) => ({ content: para }));

        // Output the JSON data
        console.log(JSON.stringify(jsonData, null, 2));

        // Length of JSON
        let jsonSize = Object.keys(jsonData).length;
        // console.log(jsonSize);

        for (let i = 0; i < jsonSize; i++) {
          if (jsonData[i]["content"] == staticTotalIncome) {
            computationSheetObject.totalIncome = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticBasicExemption) {
            computationSheetObject.basicExemption = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticIncomeTax) {
            computationSheetObject.incomeTax = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticTaxPaid) {
            computationSheetObject.taxPaid = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticTds) {
            computationSheetObject.tds = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticRefund) {
            computationSheetObject.refund = jsonData[i + 1]["content"];
          } else if (jsonData[i]["content"] == staticPayable) {
            computationSheetObject.payable = jsonData[i + 1]["content"];
          }
        }

        // Parsed Data
        console.log(computationSheetObject);
      }
    }
  );
};

// Usage
const filePath = "./testDoc2.doc";
extractDocContent(filePath);
