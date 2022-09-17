import reactLogo from './assets/react.svg'
import './App.css'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Cacambas } from './services/cacambas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const App = () => {

  const [empresas, setEmpresas] = useState<any[]>([]);
  const [cnpjs, setCnpjs] = useState<any[]>([]);
  const [tels, setTels] = useState<any[]>([]);
  const [isOk, setIsOk] = useState(false);
  const [empresa, setEmpresa] = useState<any>("");

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
          console.log(obj3);
          setTels((preTels) => [...preTels, obj3])
        })
      })
  }, []);


  const handleOnSearch = (string: any, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setIsOk(false);

  }

  const handleOnSelect = (item: any) => {
    // the item selected
    if (item) {
      setIsOk(true);
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
    <>

      <label style={styles.label}>NOME DA EMPRESA</label>
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            styling={styles.combobox}
            items={empresas}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            onClear={() => {
              setIsOk(false);
            }}
            formatResult={formatResult}
            maxResults={1}
            showNoResults={true}
          />
        </div>
      </header>

      <div style={styles.cnpj}>
        <label style={styles.label}>CNPJ</label>
        <header className="App-header">
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              styling={styles.combobox2}
              items={cnpjs}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              onClear={() => {
                setIsOk(false);
              }}
              formatResult={formatResult2}
              maxResults={1}
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
              onSelect={handleOnSelect}
              autoFocus
              onClear={() => {
                setIsOk(false);
              }}
              formatResult={formatResult3}
              maxResults={1}

            />
          </div>
        </header>
      </div>


      {isOk && <FontAwesomeIcon icon={faThumbsUp} style={styles.hand} />}
      {!isOk && <FontAwesomeIcon icon={faThumbsUp} style={styles.badhand} />}


    </>
  );
}

const styles = {
  Autocomplete: { marginTop: 25 },
  hand: {
    width: '10rem',
    height: '10rem',
    color: 'green',
    marginTop: '6rem'
  },
  badhand: {
    width: '10rem',
    height: '10rem',
    color: 'red',
    marginTop: '6rem'
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
  }
}

export default App
