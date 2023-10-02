package main

type Context struct {
	Entries map[string]interface{} `json:"entries"`
}

type CoprocessorRequest struct {
	Version int                 `json:"version,omitempty"`
	Stage   string              `json:"stage,omitempty"`
	ID      string              `json:"id,omitempty"`
	Control string              `json:"control,omitempty"`
	Headers map[string][]string `json:"headers,omitempty"`
	Body    string              `json:"body,omitempty"`
	Context *Context            `json:"context,omitempty"`
}
