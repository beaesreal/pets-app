import * as React from "react"

const Pet = (props) => (
  <svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.41 16.75C4.17 19.64 6.35 22 9.25 22h4.79c3.26 0 5.5-2.63 4.96-5.85-.57-3.38-3.83-6.15-7.26-6.15-3.72 0-7.02 3.04-7.33 6.75ZM10.47 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17.3 8.7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM21 12.7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3.97 10.7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Pet