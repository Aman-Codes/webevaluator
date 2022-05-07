const baseGoUrl =
  process.env.REACT_APP_GO_SERVER_URL || "http://localhost:8080";
const baseNodeUrl =
  process.env.REACT_APP_NODE_SERVER_URL || "http://localhost:5000/api";
const basePythonUrl =
  process.env.REACT_APP_PYTHON_SERVER_URL || "http://localhost:8000";

const endpoints = {
  goStatus: () => `${baseGoUrl}/status`,
  crawl: () => `${baseGoUrl}/crawl`,
  ssl: () => `${baseGoUrl}/ssl`,
  sslapi: () => `${basePythonUrl}/ssl`,
  cookieChecker: () => `${baseNodeUrl}/cchecker`,
  ada: () => `${baseNodeUrl}/errors/css`,
  tenon: () => `${baseNodeUrl}/tenon`,
  sniffer: () => `${baseNodeUrl}/sniffer`,
  download: () => `${baseNodeUrl}/pdf`,
  header: () => `${basePythonUrl}/securityheader`,
};

export default endpoints;
