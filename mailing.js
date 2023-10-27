
      exports.generateOneTimePass = () => {
        for (let i = 0; i < 4; i++){
          const randVal = Math.round(Math.random() * 9)
          oneTimePass = oneTimePass + randVal
        }
        return oneTimePass;
      }