package ssl

import (
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"math/big"
	"net/url"

	"github.com/Aman-Codes/backend/go/pkg/log"
)

type SSLInfo struct {
	SignatureAlgorithm x509.SignatureAlgorithm
	Version            int
	SerialNumber       *big.Int
	Issuer             pkix.Name
	Subject            pkix.Name
	NotBefore          string
	NotAfter           string
	CommonName         string
	DNSNames           []string
}

func NewSSLInfo(
	signatureAlgorithm x509.SignatureAlgorithm,
	version int,
	serialNumber *big.Int,
	issuer pkix.Name,
	subject pkix.Name,
	notBefore string,
	notAfter string,
	commonName string,
	dnsNames []string,
) *SSLInfo {
	return &SSLInfo{
		SignatureAlgorithm: signatureAlgorithm,
		Version:            version,
		SerialNumber:       serialNumber,
		Issuer:             issuer,
		Subject:            subject,
		NotBefore:          notBefore,
		NotAfter:           notAfter,
		CommonName:         commonName,
		DNSNames:           dnsNames,
	}
}

func GetHostName(URL string) (string, error) {
	u, err := url.Parse(URL)
	if err != nil {
		return "", err
	}
	return u.Hostname(), nil
}

func GetPort(URL string) (string, error) {
	u, err := url.Parse(URL)
	if err != nil {
		return "", err
	}
	return u.Port(), nil
}

func GetSSLInfo(URL string) ([]*SSLInfo, error) {
	u, err := url.Parse(URL)
	log.Infof("u is: %v\n", u)
	if err != nil {
		return nil, err
	}
	conf := &tls.Config{
		InsecureSkipVerify: true,
	}
	final := u.Hostname() + ":" + u.Port()
	if u.Port() == "" {
		final += "443"
	}
	log.Infof("final is %v", final)
	conn, err := tls.Dial("tcp", final, conf)
	if err != nil {
		log.Errorf("Error in Dial %v", err)
		return nil, err
	}
	log.Info("tls connection made")
	defer conn.Close()
	// log.Infof("conn is: %v\n", conn)
	certs := conn.ConnectionState().PeerCertificates
	log.Info("certs found")
	var sslArray []*SSLInfo
	for _, cert := range certs {
		a := NewSSLInfo(cert.SignatureAlgorithm, cert.Version, cert.SerialNumber,
			cert.Issuer, cert.Subject, cert.NotBefore.Format("2006-January-02"),
			cert.NotAfter.Format("2006-January-02"), cert.Issuer.CommonName, cert.DNSNames)
		sslArray = append(sslArray, a)
	}
	return sslArray, nil
}
