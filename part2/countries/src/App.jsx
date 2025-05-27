import { useEffect, useState } from 'react'
import axios from 'axios'


// 如何通过axios来外部服务器(如果自己来搭建服务器，需要在本地启动node)
// 来获取json数据用于页面渲染

//对于获取数组数据进行筛选和按条件展示
const App = () => {
  const [countries, setCountries] = useState([])
  const [inputs, setInputs] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)



  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('countries fetched')
        setCountries(response.data)
      })
  }, [])

  console.log('rendering', countries.length, 'countries')

  const handleFilterChange = (event) =>{
    setInputs(event.target.value)
  }

  const fieldCountries = countries.filter(couns =>
    couns.name.common.toLowerCase().includes(inputs.toLowerCase())
  )

  return (
    <div>
      <h1>Country Data</h1>
      <input type="text" value={inputs} onChange={handleFilterChange} />
      
      {fieldCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {fieldCountries.length <= 10 && fieldCountries.length > 1 && (
        <div>
          {fieldCountries.map(coun =>
            <div key={coun.cca3}>{coun.name.common}
              <button onClick={() => setSelectedCountry(coun)}>Show</button>
            </div>
          )}
        </div>
      )}

      {fieldCountries.length === 1 && (
        <div>
          <h2>{fieldCountries[0].name?.common || 'N/A'}</h2>
          <p>Capital: {fieldCountries[0].capital?.[0]  || 'N/A'}</p>
          <p>Population: {fieldCountries[0].population  ?? 'N/A'}</p>
          <ul>
            {Object.values(fieldCountries[0].languages || {}).map(lang =>(
              <li key={lang}>{lang}</li>
              ))
            }
          </ul>
          <img src={fieldCountries[0].flags.png} 
                alt={`Flag of ${fieldCountries[0].name.common}`} 
                width="150"
          />
        </div>      
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital?.[0]}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages || {}).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="150"
          />
        </div>
      )}

    </div>
  )
}

export default App
