import React, { useState, useEffect, useRef } from "react";
import endpoints from "constants/endpoints";
import axios from "axios";
import {
  sendPostRequestSetter,
  sendSslPostRequestSetter,
} from "shared/sendRequest";
import { useLocation } from "react-router-dom";
import Loader from "components/Loader";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import fileDownload from "js-file-download";
import ScrollableTabs from "components/ScrollableTabs";
import {
  sslApiColumns,
  sslApiId,
  cookiesColumns,
  cookiesId,
  adaColumn,
  adaId,
  wcagColumns,
  section508Columns,
  snifferId,
} from "constants/columns";
import useStyles from "./styles";

const Report = () => {
  const query = new URLSearchParams(useLocation().search);
  const url = query.get("url");
  const [crawl, setCrawl] = useState(null);
  const [ssl, setSsl] = useState({});
  const [cookie, setCookie] = useState(null);
  const [ada, setAda] = useState(null);
  const [sniffer, setSniffer] = useState(null);
  const [header, setHeader] = useState(null);
  const tableRef = useRef(null);
  const [sslScore, setSslScore] = useState(null);
  const [cookieScore, setCookieScore] = useState(null);
  const [wcagScore, setWcagScore] = useState(null);
  const [accessScore, setAccessScore] = useState(null);
  const [headerScore, setHeaderScore] = useState(null);
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const [missingHeaders, setMissingHeaders] = useState(null);

  const scrollDown = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleDownload = () => {
    setDownloadInProgress(true);
    axios({
      url: endpoints.download(),
      method: "POST",
      data: {
        url,
      },
      responseType: "blob",
    }).then((response) => {
      fileDownload(response.data, "report.pdf");
      setDownloadInProgress(false);
    });
  };
  const [mapping, setMapping] = useState({
    1: {
      id: 1,
      title: "SSL Certificates",
      columns: sslApiColumns,
      uniqueId: sslApiId,
      rows: [],
    },
    2: {
      id: 2,
      title: "Initial Cookies",
      columns: cookiesColumns,
      uniqueId: cookiesId,
      rows: [],
    },
    3: {
      id: 3,
      title: "Accepted Cookies",
      columns: cookiesColumns,
      uniqueId: cookiesId,
      rows: [],
    },
    4: {
      id: 4,
      title: "Denied Cookies",
      columns: cookiesColumns,
      uniqueId: cookiesId,
      rows: [],
    },
    5: {
      id: 5,
      title: "WCAG2A",
      columns: wcagColumns,
      uniqueId: snifferId,
      rows: [],
    },
    6: {
      id: 6,
      title: "WCAG2AA",
      columns: wcagColumns,
      uniqueId: snifferId,
      rows: [],
    },
    7: {
      id: 7,
      title: "WCAG2AAA",
      columns: wcagColumns,
      uniqueId: snifferId,
      rows: [],
    },
    8: {
      id: 8,
      title: "Section 508",
      columns: section508Columns,
      uniqueId: snifferId,
      rows: [],
    },
    9: {
      id: 9,
      title: "Accessibility Error",
      columns: adaColumn,
      uniqueId: adaId,
      rows: [],
    },
    10: {
      id: 10,
      title: "Accessibility Warnings",
      columns: adaColumn,
      uniqueId: adaId,
      rows: [],
    },
  });
  useEffect(() => {
    setMapping((prev) => {
      console.log("ssl inside useEffect is ", ssl);
      return {
        ...prev,
        1: {
          id: 1,
          title: "SSL Certificates",
          columns: sslApiColumns,
          uniqueId: sslApiId,
          rows: [ssl] || [],
        },
      };
    });
  }, [JSON.stringify(ssl)]);
  useEffect(() => {
    setMapping((prev) => {
      return {
        ...prev,
        2: {
          id: 2,
          title: "Initial Cookies",
          columns: cookiesColumns,
          uniqueId: cookiesId,
          rows: cookie?.data?.initialCookies || [],
        },
        3: {
          id: 3,
          title: "Accepted Cookies",
          columns: cookiesColumns,
          uniqueId: cookiesId,
          rows: cookie?.data?.consentAcceptedCookies || [],
        },
        4: {
          id: 4,
          title: "Denied Cookies",
          columns: cookiesColumns,
          uniqueId: cookiesId,
          rows: cookie?.data?.consentDeniedCookies || [],
        },
      };
    });
  }, [JSON.stringify(cookie)]);
  useEffect(() => {
    setMapping((prev) => {
      return {
        ...prev,
        5: {
          id: 5,
          title: "WCAG2A",
          columns: wcagColumns,
          uniqueId: snifferId,
          rows: sniffer?.result?.WCAG2A || [],
        },
        6: {
          id: 6,
          title: "WCAG2AA",
          columns: wcagColumns,
          uniqueId: snifferId,
          rows: sniffer?.result?.WCAG2AA || [],
        },
        7: {
          id: 7,
          title: "WCAG2AAA",
          columns: wcagColumns,
          uniqueId: snifferId,
          rows: sniffer?.result?.WCAG2AAA || [],
        },
        8: {
          id: 8,
          title: "Section 508",
          columns: section508Columns,
          uniqueId: snifferId,
          rows: sniffer?.result?.Section508 || [],
        },
      };
    });
  }, [JSON.stringify(sniffer)]);
  useEffect(() => {
    setMapping((prev) => {
      return {
        ...prev,
        9: {
          id: 9,
          title: "Accessibility Error",
          columns: adaColumn,
          uniqueId: adaId,
          rows: ada?.data?.error || [],
        },
        10: {
          id: 10,
          title: "Accessibility Warnings",
          columns: adaColumn,
          uniqueId: adaId,
          rows: ada?.data?.warning || [],
        },
      };
    });
  }, [JSON.stringify(ada)]);
  useEffect(() => {
    const promiseList = [];
    promiseList.push(
      sendSslPostRequestSetter(
        endpoints.sslapi(),
        {
          URL: url,
        },
        setSsl
      )
    );
    promiseList.push(
      sendPostRequestSetter(
        endpoints.crawl(),
        {
          URL: url,
        },
        setCrawl
      )
    );
    promiseList.push(
      sendPostRequestSetter(
        endpoints.cookieChecker(),
        {
          url,
        },
        setCookie
      )
    );
    promiseList.push(
      sendPostRequestSetter(
        endpoints.ada(),
        {
          url,
        },
        setAda
      )
    );
    promiseList.push(
      sendPostRequestSetter(
        endpoints.sniffer(),
        {
          url,
        },
        setSniffer
      )
    );
    promiseList.push(
      sendPostRequestSetter(
        endpoints.header(),
        {
          URL: url,
        },
        setHeader
      )
    );
    Promise.allSettled(promiseList)
      .then((data) => {
        console.log(data);
        // console.log("header is", header);
        setSslScore(data[0].value ? 100 : 0);
        setCookieScore(
          // eslint-disable-next-line no-nested-ternary
          data[2].value.data.consentAsked && data[2].value.data.denyConsent
            ? 100
            : data[2].value.data.consentAsked || data[2].value.data.denyConsent
            ? 50
            : 0
        );
        setWcagScore(
          data[4].value.result.Section508.length +
            data[4].value.result.WCAG2A.length +
            data[4].value.result.WCAG2AA.length +
            data[4].value.result.WCAG2AAA.length
        );
        setAccessScore(
          data[3].value.data.error.length + data[3].value.data.warning.length
        );
        setHeaderScore(
          100 - Object.values(data[5].value)[0].missing.length * 10
        );
        setMissingHeaders(Object.values(data[5].value)[0].missing);
        console.log(Object.values(data[5].value)[0].missing);
        console.log(missingHeaders);
        console.log(header);
      })
      .catch((error) => {
        console.error(error);
      });
    setMapping([]);
  }, []);
  console.log("cookieScore", cookieScore);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>URL getting scanned: {url}</h1>
      </div>
      <div className={classes.head_div}>
        <div className={classes.score_div}>
          {sslScore ? (
            <div className={classes.score_val}>
              <div className={classes.score_border}>
                <p className={classes.score_ssl}>{sslScore}</p>
              </div>
              <p className={classes.para}>SSL Score</p>
            </div>
          ) : (
            <div className={classes.score_loader1}>
              <Loader />
            </div>
          )}
          {/* {cookieScore ? (
            <div className={classes.score_val}>
              <div className={classes.score_border}>
                <p className={classes.score_cookie}>{cookieScore}</p>
              </div>
              <p className={classes.para}>Cookie Score</p>
            </div>
          ) : (
            <div className={classes.score_loader1}>
              <Loader />
            </div>
          )} */}
          {wcagScore ? (
            <div className={classes.score_val}>
              <div className={classes.score_border}>
                <p className={classes.score_text}>{(1000 - wcagScore) / 10}</p>
              </div>
              <p className={classes.para}>WCAG Score</p>
            </div>
          ) : (
            <div className={classes.score_loader1}>
              <Loader />
            </div>
          )}
          {accessScore ? (
            <div className={classes.score_val}>
              <div className={classes.score_border}>
                <p className={classes.score_ada}>{100 - accessScore}</p>
              </div>
              <p className={classes.para}>Accessibility Score</p>
            </div>
          ) : (
            <div className={classes.score_loader1}>
              <Loader />
            </div>
          )}
          {headerScore ? (
            <div className={classes.score_val}>
              <div className={classes.score_border}>
                <p className={classes.score_text}>{headerScore}</p>
              </div>
              <p className={classes.para}>Security Header Score</p>
            </div>
          ) : (
            <div className={classes.score_loader1}>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.url_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Media URLs{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {crawl ? Object.keys(crawl?.mediaList)?.length : <Loader />}
            </p>
          </div>
        </div>
        <div className={classes.url_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Site URLs{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {crawl ? Object.keys(crawl?.urlList)?.length : <Loader />}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>Secure Sockets Layer Certifications</h1>
      </div>
      <div className={classes.flex}>
        {ssl ? (
          <div className={classes.ssl_container}>
            <div onClick={scrollDown} onKeyDown={scrollDown} aria-hidden="true">
              <p className={classes.p}>{ssl.issuer_cn}</p>
              <div className={classes.ssl_div}>
                <p className={classes.ssl_para_issue}>
                  Issued on: {ssl?.valid_from}
                </p>
                <p className={classes.ssl_para_expire}>
                  Expires on: {ssl?.valid_till}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>
          Cookies Availability and Permissions
        </h1>
      </div>
      <div className={classes.flex}>
        <div className={classes.ssl_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Cookies Consent Asked{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {cookie ? (
                `${cookie?.data?.consentAsked ? "Yes" : "No"}`
              ) : (
                <Loader />
              )}
            </p>
          </div>
        </div>
        <div className={classes.ssl_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Deny Cookies Option Present{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {cookie ? (
                `${cookie?.data?.denyConsent ? "Yes" : "No"}`
              ) : (
                <Loader />
              )}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.ssl_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Initial Cookies:{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {cookie ? cookie?.data?.initialCookies?.length : <Loader />}
            </p>
          </div>
        </div>
        <div className={classes.ssl_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Cookies After Accept:{" "}
          </p>
          {cookie ? (
            <div className={classes.url_div}>
              <p className={classes.url_p}>
                {cookie?.data?.consentAcceptedCookies?.length || 0}
              </p>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.ssl_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Cookies After Deny:{" "}
          </p>
          {cookie ? (
            <div className={classes.url_div}>
              <p className={classes.url_p}>
                {cookie?.data?.consentDeniedCookies?.length || 0}
              </p>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>
          Web Content Accessibility (WCAG) Checks
        </h1>
      </div>
      <div className={classes.flex}>
        <div className={classes.wcag_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            WCAG2A Errors:{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {sniffer ? sniffer?.result?.WCAG2A?.length : <Loader />}
            </p>
          </div>
        </div>
        <div className={classes.wcag_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            WCAG2AA Errors:{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {sniffer ? sniffer?.result?.WCAG2AA?.length : <Loader />}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.wcag_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            WCAG2AAA Errors:{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {sniffer ? sniffer?.result?.WCAG2AAA?.length : <Loader />}
            </p>
          </div>
        </div>
        <div className={classes.wcag_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Section 508 Errors:{" "}
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {sniffer ? sniffer?.result?.Section508?.length : <Loader />}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>
          Other Accessibility and ADA Compliance Checks
        </h1>
      </div>
      <div className={classes.flex}>
        <div className={classes.wcag_container}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Errors
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {ada ? ada?.data?.error?.length : <Loader />}
            </p>
          </div>
        </div>
        <div className={classes.wcag_container_warn}>
          <p
            className={classes.p}
            onClick={scrollDown}
            onKeyDown={scrollDown}
            aria-hidden="true"
          >
            Warnings
          </p>
          <div className={classes.url_div}>
            <p className={classes.url_p}>
              {ada ? ada?.data?.warning?.length : <Loader />}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.head_div}>
        <h1 className={classes.heading}>Missing Security Headers</h1>
      </div>
      <div>
        {missingHeaders
          ? missingHeaders.map((data) => (
              <div
                className={classes.wcag_container}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <p
                  className={classes.p}
                  onClick={scrollDown}
                  onKeyDown={scrollDown}
                  aria-hidden="true"
                >
                  {data}
                </p>
              </div>
            ))
          : null}
      </div>
      <div className={classes.button_div}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleDownload}
        >
          Download Complete Report
        </Button>
        {downloadInProgress ? <Loader /> : null}
      </div>
      <div ref={tableRef} />
      <ScrollableTabs mapping={mapping} />
    </div>
  );
};

export default Report;
