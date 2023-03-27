import * as React from "react"
import Svg, {SvgProps, Path} from "react-native-svg"

//конвертируек SVG => https://react-svgr.com/playground/?native=true&typescript=true

export const Svg1 = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 8.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM10 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
            fill="#47495F"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 4.5a3.615 3.615 0 0 0-3.59 4.034l.75 6.438A2.86 2.86 0 0 0 11 17.456V19H7.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1H12v-1.544a2.86 2.86 0 0 0 2.34-2.484l.405-3.472H19a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5h-4.264a3.613 3.613 0 0 0-3.236-2Zm3.564 3c.057.333.069.68.027 1.034l-.23 1.966H18.5v-3h-3.436Zm-6.162.918a2.615 2.615 0 1 1 5.196 0l-.751 6.438a1.86 1.86 0 0 1-3.694 0l-.75-6.438Z"
            fill="#47495F"
        />
    </Svg>
)