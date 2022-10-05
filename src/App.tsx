import reactLogo from './assets/react.svg'
import './App.css'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Cacambas } from './services/cacambas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


const App = () => {

  const [empresas, setEmpresas] = useState<any[]>([]);
  const [cnpjs, setCnpjs] = useState<any[]>([]);
  const [tels, setTels] = useState<any[]>([]);
  const [isOk, setIsOk] = useState(false);
  const [empresa, setEmpresa] = useState<any>("");
  const [cnpj, setCnpj] = useState<any>("");
  const [tel, setTel] = useState<any>("");
  const [isNew, setIsNew] = useState(false);
  const { innerWidth, innerHeight } = window;

  useEffect(() => {

    Cacambas()
      .then(response => {
        setEmpresas([]);
        setCnpjs([]);
        setTels([]);

        response.data.union.forEach((empresa: any) => {
          let obj = { id: empresa.cnpj, name: empresa.razaosocial }
          setEmpresas((preEmpresas) => [...preEmpresas, obj]);

          let obj2 = { id: empresa.razaosocial, name: empresa.cnpj }
          setCnpjs((preCnpjs) => [...preCnpjs, obj2]);

          let obj3 = { id: empresa.razaosocial, name: empresa.tel }
          setTels((preTels) => [...preTels, obj3])
        })
      })
  }, []);


  const handleOnSearch = (string: any, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setIsOk(false);

  }

  const handleOnSelectEmpresa = (item: any) => {
    // the item selected
    if (item) {
      setIsOk(true);
      const index = empresas.findIndex(x => x.name === item.name);
      setEmpresa(empresas[index].name);
      setCnpj(cnpjs[index].name);
      setTel(tels[index].name.trim());
      setIsNew(false);
    }
  }

  const handleOnSelectCnpj = (item: any) => {
    // the item selected
    if (item) {
      setCnpj(item);
      setIsOk(true);
      const index = cnpjs.findIndex(x => x.name === item.name);
      setEmpresa(empresas[index].name);
      setCnpj(cnpjs[index].name);
      setTel(tels[index].name.trim());
      setIsNew(false);
    }
  }

  const handleOnSelectTelefone = (item: any) => {
    // the item selected
    if (item) {
      setIsOk(true);
      const index = tels.findIndex(x => x.name === item.name);
      setEmpresa(empresas[index].name);
      setCnpj(cnpjs[index].name);
      setTel(tels[index].name.trim());
      setIsNew(false);
    }
  }

  const formatResult = (item: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>CNPJ: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>NOME: {item.name}</span>
      </>
    )
  }

  const formatResult2 = (item: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>CNPJ: {item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>NOME: {item.id}</span>

      </>
    )
  }

  const formatResult3 = (item: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>TEl(s): {item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>NOME: {item.id}</span>

      </>
    )
  }

  return (
    <div className='container'>

      {!isNew && <div>





        <div className="form-group">

          <button
            id="search"
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              setIsNew(true);
              setEmpresa("");
              setCnpj("");
              setTel("");
            }}
          ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

          {isOk && <div id="hand"><FontAwesomeIcon icon={faThumbsUp} style={styles.hand} /></div>}
          <label id="dadosdaempresa">Dados coletados na busca</label>
          <input disabled type="text" value={cnpj} className="form-control" id="cnpj" onChange={() => { }}></input>
          <input disabled type="text" value={empresa} className="form-control" id="razaosocial" onChange={() => { }}></input>
          <input disabled type="text" value={tel} className="form-control" id="telefone" onChange={() => { }}></input>


        </div>

      </div>}

      {isNew && <div>
        <label style={styles.label}>NOME DA EMPRESA</label>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            styling={styles.combobox}
            items={empresas}
            onSearch={handleOnSearch}
            onSelect={handleOnSelectEmpresa}
            autoFocus
            onClear={() => {
              setIsOk(false);
            }}
            formatResult={formatResult}
            maxResults={5}
            showNoResults={true}
          />
        </div>

        <div style={styles.cnpj}>
          <label style={styles.label}>CNPJ</label>
          <header className="App-header">
            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                styling={styles.combobox2}
                items={cnpjs}
                onSearch={handleOnSearch}
                onSelect={handleOnSelectCnpj}
                onClear={() => {
                  setIsOk(false);
                }}
                formatResult={formatResult2}
                maxResults={5}
                showNoResults={true}
              />
            </div>
          </header>
        </div>

        <div style={styles.cnpj}>
          <label style={styles.label}>TELEFONES</label>
          <header className="App-header">
            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                showNoResults={true}
                styling={styles.combobox3}
                items={tels}
                onSearch={handleOnSearch}
                onSelect={handleOnSelectTelefone}
                onClear={() => {
                  setIsOk(false);
                }}
                formatResult={formatResult3}
                maxResults={5}

              />
            </div>
          </header>
        </div>


      </div>
      }

    </div>
  );
}

const styles = {
  Autocomplete: { marginTop: 25 },
  hand: {
    width: '4rem',
    height: '4rem',
    color: 'green',
  },
  combobox: {
    height: "4rem",
    border: "1px solid #dfe1e5",
    borderRadius: "24px",
    backgroundColor: "white",
    boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
    hoverBackgroundColor: "#eee",
    color: "#212121",
    fontSize: "1.5rem",
    fontFamily: "Arial",
    iconColor: "grey",
    lineColor: "rgb(232, 234, 237)",
    placeholderColor: "grey",
    clearIconMargin: '3px 14px 0 0',
    searchIconMargin: '0 0 0 16px',
    zIndex: 1000
  },

  combobox2: {
    height: "4rem",
    border: "1px solid #dfe1e5",
    borderRadius: "24px",
    backgroundColor: "white",
    boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
    hoverBackgroundColor: "#eee",
    color: "#212121",
    fontSize: "1.5rem",
    fontFamily: "Arial",
    iconColor: "grey",
    lineColor: "rgb(232, 234, 237)",
    placeholderColor: "grey",
    clearIconMargin: '3px 14px 0 0',
    searchIconMargin: '0 0 0 16px',
    zIndex: 900
  },

  combobox3: {
    height: "4rem",
    border: "1px solid #dfe1e5",
    borderRadius: "24px",
    backgroundColor: "white",
    boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
    hoverBackgroundColor: "#eee",
    color: "#212121",
    fontSize: "1.5rem",
    fontFamily: "Arial",
    iconColor: "grey",
    lineColor: "rgb(232, 234, 237)",
    placeholderColor: "grey",
    clearIconMargin: '3px 14px 0 0',
    searchIconMargin: '0 0 0 16px',
    zIndex: 800
  },

  label: {
    fontSize: '1.5rem'
  },
  cnpj: {
    marginTop: '6rem'
  },
  span: {
    textAlign: 'left'
  }
}

export default App
