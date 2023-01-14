import * as React from "react"

const User = (props) => (
  <svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default User