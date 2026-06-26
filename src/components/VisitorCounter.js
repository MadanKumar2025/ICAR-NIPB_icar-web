// import { useEffect } from "react";

// function VisitorCounter() {
//   useEffect(() => {
//     const script = document.createElement("script");

//     script.src =
//       "https://www.freevisitorcounters.com/en/home/counter/1579760/t/5";
//     script.async = true;
//     script.type = "text/javascript";

//     document.getElementById("visitor-counter").appendChild(script);

//     return () => {
//       const container = document.getElementById("visitor-counter");
//       if (container.contains(script)) {
//         container.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <div id="visitor-counter">
//       <a
//         href="https://www.counter-zaehler.de"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Counter-Zähler.de
//       </a>
//     </div>
//   );
// }

// export default VisitorCounter;