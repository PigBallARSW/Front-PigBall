import {SoccerField} from "../../components/game/SoccerField"

export const MainGame = () => {
  return (
    <main className="overflow-hidden p-0 m-0">
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <SoccerField />
    </main>
  )
}