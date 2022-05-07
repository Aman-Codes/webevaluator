package core

import (
	"net/url"
	"path"
	"regexp"
	"strings"

	"golang.org/x/net/publicsuffix"
)

var nameStripRE = regexp.MustCompile("(?i)^((20)|(25)|(2b)|(2f)|(3d)|(3a)|(40))+")

func GetDomain(site *url.URL) string {
	domain, err := publicsuffix.EffectiveTLDPlusOne(site.Hostname())
	if err != nil {
		return ""
	}
	return domain
}

func FixUrl(mainSite *url.URL, nextLoc string) string {
	nextLocUrl, err := url.Parse(nextLoc)
	if err != nil {
		return ""
	}
	return mainSite.ResolveReference(nextLocUrl).String()
}

func Unique(intSlice []string) []string {
	keys := make(map[string]bool)
	var list []string
	for _, entry := range intSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

func GetExtType(rawUrl string) string {
	u, err := url.Parse(rawUrl)
	if err != nil {
		return ""
	}
	return path.Ext(u.Path)
}

func CleanSubdomain(s string) string {
	s = strings.TrimSpace(strings.ToLower(s))
	s = strings.TrimPrefix(s, "*.")
	s = cleanName(s)
	return s
}

// Clean up the names scraped from the web.
func cleanName(name string) string {
	for {
		if i := nameStripRE.FindStringIndex(name); i != nil {
			name = name[i[1]:]
		} else {
			break
		}
	}

	name = strings.Trim(name, "-")
	// Remove dots at the beginning of names
	if len(name) > 1 && name[0] == '.' {
		name = name[1:]
	}
	return name
}

func FilterNewLines(s string) string {
	return regexp.MustCompile(`[\t\r\n]+`).ReplaceAllString(strings.TrimSpace(s), " ")
}

func DecodeChars(s string) string {
	source, err := url.QueryUnescape(s)
	if err == nil {
		s = source
	}

	// In case json encoded chars
	replacer := strings.NewReplacer(
		`\u002f`, "/",
		`\u0026`, "&",
	)
	s = replacer.Replace(s)
	return s
}

func InScope(u *url.URL, regexps []*regexp.Regexp) bool {
	for _, r := range regexps {
		if r.MatchString(u.String()) {
			return true
		}
	}
	return false
}

func contains(i []int, j int) bool {
	for _, value := range i {
		if value == j {
			return true
		}
	}
	return false
}
