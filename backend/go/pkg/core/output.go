package core

import (
	"sync"
)

type Output struct {
	mu sync.Mutex
	mm sync.Mutex
	L  map[string]SpiderOutput
	M  map[string]SpiderOutput
}

func NewOutput() *Output {
	var list map[string]SpiderOutput = make(map[string]SpiderOutput)
	var mediaList map[string]SpiderOutput = make(map[string]SpiderOutput)
	return &Output{
		L: list,
		M: mediaList,
	}
}

func (o *Output) WriteToList(msg SpiderOutput) {
	o.mu.Lock()
	defer o.mu.Unlock()
	o.L[msg.Output] = msg
	// o.L = append(o.L, msg)
}

func (o *Output) WriteToMediaList(msg SpiderOutput) {
	o.mm.Lock()
	defer o.mm.Unlock()
	o.M[msg.Output] = msg
	// o.M = append(o.M, msg)
}
