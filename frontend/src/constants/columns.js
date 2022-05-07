export const crawlerColumns = [{ flex: 1, field: "id", headerName: "ID" }];

export const sslColumns = [
  { flex: 1, field: "SignatureAlgorithm", headerName: "Signature Algorithm" },
  { flex: 1, field: "Version", headerName: "Version" },
  { flex: 1, field: "SerialNumber", headerName: "Serial Number" },
  { flex: 1, field: "NotBefore", headerName: "Issue Date" },
  { flex: 1, field: "NotAfter", headerName: "Expiry Date" },
  { flex: 1, field: "CommonName", headerName: "Common Name" },
  { flex: 1, field: "DNSNames", headerName: "DNS Names" },
  {
    flex: 1,
    field: "Issuer",
    headerName: "Issuer Country",
    valueFormatter: (params) => params.value.Country?.join(" "),
  },
  {
    flex: 1,
    field: "Issuer",
    headerName: "Issuer Organization",
    valueFormatter: (params) => params.value.Organization?.join(" "),
  },
  {
    flex: 1,
    field: "Issuer",
    headerName: "Issuer Organizational Unit",
    valueFormatter: (params) => params.value.OrganizationalUnit?.join(" "),
  },
  {
    flex: 1,
    field: "Issuer",
    headerName: "Issuer Common Name",
    valueFormatter: (params) => params.value.CommonName,
  },
  {
    flex: 1,
    field: "Subject",
    headerName: "Subject Country",
    valueFormatter: (params) => params.value.Country?.join(" "),
  },
  {
    flex: 1,
    field: "Subject",
    headerName: "Subject Organization",
    valueFormatter: (params) => params.value.Organization?.join(" "),
  },
  {
    flex: 1,
    field: "Subject",
    headerName: "Subject Organizational Unit",
    valueFormatter: (params) => params.value.OrganizationalUnit?.join(" "),
  },
  {
    flex: 1,
    field: "Subject",
    headerName: "Subject Common Name",
    valueFormatter: (params) => params.value.CommonName,
  },
];

export const sslApiColumns = [
  { field: "host", headerName: "Host" },
  { field: "tcp_port", headerName: "TCP Port" },
  { field: "issued_to", headerName: "Issued To" },
  { field: "issued_o", headerName: "Issued Organization" },
  { field: "issuer_c", headerName: "Issuer Country" },
  { field: "issuer_o", headerName: "Issuer Organization" },
  { field: "issuer_ou", headerName: "Issuer Organizational Unit" },
  { field: "issuer_cn", headerName: "Issuer Common Name" },
  { field: "cert_sn", headerName: "Serial Number" },
  { field: "cert_sha1", headerName: "SHA1" },
  { field: "cert_alg", headerName: "Algorithm" },
  { field: "cert_ver", headerName: "Version" },
  { field: "valid_from", headerName: "Valid From" },
  { field: "valid_till", headerName: "Valid Till" },
  { field: "days_left", headerName: "Days Left" },
  { field: "grade", headerName: "Grade" },
  { field: "poodle_vuln", headerName: "Poodle Vulnerability" },
  { field: "heartbleed_vuln", headerName: "Heartbleed Vulnerability" },
  { field: "heartbeat_vuln", headerName: "Heartbeat Vulnerability" },
  { field: "freak_vuln", headerName: "Freak Vulnerability" },
  { field: "logjam_vuln", headerName: "Logjam Vulnerability" },
  { field: "drownVulnerable", headerName: "Drown Vulnerable" },
  {
    field: "cert_sans",
    headerName: "DNS Names",
    valueFormatter: (params) =>
      params.value.replace(/DNS:/g, "").replace(/;/g, ","),
  },
];

export const sslId = "SerialNumber";

export const sslApiId = "cert_sn";

export const cookiesColumns = [
  { flex: 1, field: "name", headerName: "Name" },
  { flex: 1, field: "value", headerName: "Value" },
  { flex: 1, field: "domain", headerName: "Domain" },
  { flex: 1, field: "path", headerName: "Path" },
  { flex: 1, field: "expires", headerName: "Expires" },
  { flex: 1, field: "size", headerName: "Size" },
  { flex: 1, field: "httpOnly", headerName: "HTTP Only" },
  { flex: 1, field: "secure", headerName: "Secure" },
  { flex: 1, field: "session", headerName: "Session" },
  { flex: 1, field: "sameParty", headerName: "Same Party" },
  { flex: 1, field: "sourceScheme", headerName: "Source Scheme" },
  { flex: 1, field: "source Port", headerName: "Source Port" },
  {
    flex: 1,
    field: "placed_by",
    headerName: "Placed By",
    // valueFormatter: (params) => params.value.placed_by || "",
  },
  {
    flex: 1,
    field: "functionality",
    headerName: "Functionality",
    // valueFormatter: (params) => params.value.functionality || "",
  },
  {
    flex: 1,
    field: "purpose",
    headerName: "Purpose",
    // valueFormatter: (params) => params.value.purpose || "",
  },
];

export const cookiesId = "name";

export const adaColumn = [
  { flex: 1, field: "selector", headerName: "Selector" },
  { flex: 1, field: "name", headerName: "Name" },
  { flex: 1, field: "description", headerName: "Description" },
  { flex: 1, field: "count", headerName: "Count" },
];

export const adaId = "name";

export const wcagColumns = [
  { flex: 1, field: "type", headerName: "Type" },
  { flex: 1, field: "code", headerName: "Code" },
  { flex: 1, field: "message", headerName: "Message" },
  { flex: 1, field: "element", headerName: "Element" },
  {
    flex: 1,
    field: "msgInfo",
    headerName: "Success Criterion",
    valueFormatter: (params) =>
      params.value[0]?.["Success Criterion"]?.join(" \n"),
  },
  {
    flex: 1,
    field: "msgInfo",
    headerName: "Suggested Techniques",
    valueFormatter: (params) =>
      params.value[1]?.["Suggested Techniques"]?.join(" \n"),
  },
];

export const section508Columns = [
  { flex: 1, field: "type", headerName: "Type" },
  { flex: 1, field: "code", headerName: "Code" },
  { flex: 1, field: "message", headerName: "Message" },
  { flex: 1, field: "element", headerName: "Element" },
  {
    flex: 1,
    field: "msgInfo",
    headerName: "Section",
    valueFormatter: (params) => params.value[0]?.Section,
  },
];

export const snifferId = "code";
