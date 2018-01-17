## NoSI (NodeJS Service)
-------

#### Routes
**Base urls:**
- Local: ``https://localhost:3000/service``
- Public: ``https://[ip]:3000/service``

**Route descriptions**
| Method | Path | Description |
|--------|------|-------------|
|GET|/getallhardware?apikey=``APIKEY``| Returns a list of all hardware in the database|
|GET|/getstate/``name``?apikey=``APIKEY``|Returns the state of hardware with the name: ``name``|
|GET|/getactionlog?apikey=``APIKEY``|Returns the entire actionlog|
|POST|/updatestate?apikey=``APIKEY``|Changes the state of hardware, exspects the body to be in this format:<br>**name**: Wekker<br>**interaction**: alarm<br>**state**: off|
|POST|/newhardware?apikey=``APIKEY``|Add hardware to database|


