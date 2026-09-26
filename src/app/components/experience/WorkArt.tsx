/** Original, illustrative system diagrams. Never presented as measured outputs. */
export default function WorkArt({ index }: { index: number }) {
  return (
    <svg
      className={`work-art art-${index}`}
      viewBox="0 0 480 340"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`grid-${index}`}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path d="M32 0H0V32" stroke="currentColor" opacity=".12" />
        </pattern>
      </defs>
      <rect width="480" height="340" fill={`url(#grid-${index})`} />
      {index === 0 && (
        <g stroke="currentColor">
          <rect x="46" y="67" width="138" height="194" rx="8" strokeWidth="2" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M65 ${98 + i * 25}h${i % 2 ? 76 : 100}`}
              strokeWidth={i === 2 ? 10 : 3}
              opacity={i === 2 ? ".3" : ".8"}
            />
          ))}
          <path d="M195 166h76m-14-12 14 12-14 12" strokeWidth="2" />
          <rect
            x="287"
            y="95"
            width="151"
            height="147"
            rx="10"
            strokeWidth="2"
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="309" cy={124 + i * 40} r="5" fill="currentColor" />
              <path d={`M328 ${124 + i * 40}h85`} strokeWidth="3" />
            </g>
          ))}
        </g>
      )}
      {index === 1 && (
        <g>
          <path d="M45 268H448M64 280V52" stroke="currentColor" opacity=".45" />
          <path
            d="m65 239 62-24 54 9 58-61 40 10 58-69 101-33v150l-101-30-58 23-40-15-58 30-54-1-62 19Z"
            fill="currentColor"
            opacity=".15"
          />
          <path
            d="m65 243 62-26 54 12 58-54 40 16 58-56 101 5"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path d="M279 62v204" stroke="currentColor" strokeDasharray="4 7" />
          {[65, 127, 181, 239, 279].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[243, 217, 229, 175, 191][i]}
              r="6"
              fill="currentColor"
            />
          ))}
        </g>
      )}
      {index === 2 && (
        <g stroke="currentColor" strokeWidth="2">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="35" y={47 + i * 86} width="105" height="54" rx="5" />
              <path
                d={`M50 ${65 + i * 86}h55m-55 13h74M140 ${74 + i * 86}h49V160h48`}
                opacity=".7"
              />
            </g>
          ))}
          <circle cx="266" cy="160" r="32" />
          <path d="m253 161 9 9 19-21M298 160h43" />
          <rect x="341" y="82" width="108" height="156" rx="6" />
          <path d="M360 213v-36m25 36V138m25 75V109" strokeWidth="12" />
          <path d="M355 250h82" />
        </g>
      )}
      {index === 3 && (
        <g stroke="currentColor">
          <circle cx="143" cy="163" r="86" strokeWidth="2" />
          <circle cx="337" cy="163" r="86" strokeWidth="2" />
          <path
            d="M57 163h366M143 77c-61 61-61 111 0 172m0-172c61 61 61 111 0 172M337 77c-61 61-61 111 0 172m0-172c61 61 61 111 0 172"
            opacity=".4"
          />
          <path
            d="M143 163q95-134 194 0"
            strokeWidth="4"
            strokeDasharray="7 7"
          />
          <circle cx="143" cy="163" r="9" fill="currentColor" />
          <circle cx="337" cy="163" r="9" fill="currentColor" />
          <text x="124" y="290" fill="currentColor" stroke="none" fontSize="17">
            IT
          </text>
          <text x="320" y="290" fill="currentColor" stroke="none" fontSize="17">
            TR
          </text>
        </g>
      )}
      {index === 4 && (
        <g stroke="currentColor">
          <path d="M67 270h350M67 270V57" />
          <path d="m80 257 308-183" strokeDasharray="5 5" />
          {Array.from({ length: 29 }, (_, i) => (
            <circle
              key={i}
              cx={87 + ((i * 71) % 309)}
              cy={258 - ((i * 71) % 309) * 0.58 + Math.sin(i * 4) * 22}
              r={i % 4 === 0 ? 7 : 4}
              fill="currentColor"
              opacity={i % 4 === 0 ? ".9" : ".45"}
            />
          ))}
          <circle cx="343" cy="121" r="40" strokeWidth="2" />
          <path d="m370 150 34 35" strokeWidth="5" />
        </g>
      )}
      {index === 5 && (
        <g stroke="currentColor">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={66 + i * 51}
              y={264 - i * 26}
              width="33"
              height={i * 26 + 12}
              fill="currentColor"
              opacity={i < 3 ? ".25" : ".8"}
              stroke="none"
            />
          ))}
          <path
            d="M54 285h377M205 40v260"
            strokeDasharray="5 6"
            strokeWidth="2"
          />
          <path d="m179 62 26-22 26 22" strokeWidth="2" />
        </g>
      )}
      {index === 6 && (
        <g stroke="currentColor">
          <circle cx="179" cy="167" r="103" strokeWidth="38" opacity=".18" />
          <path d="M179 64a103 103 0 0 1 103 103" strokeWidth="38" />
          <path
            d="M282 167a103 103 0 0 1-83 101"
            strokeWidth="38"
            opacity=".55"
          />
          <text x="156" y="183" fill="currentColor" stroke="none" fontSize="47">
            Σ
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path
                d={`M325 ${102 + i * 46}h97`}
                opacity=".3"
                strokeWidth="8"
              />
              <path d={`M325 ${102 + i * 46}h${78 - i * 16}`} strokeWidth="8" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
