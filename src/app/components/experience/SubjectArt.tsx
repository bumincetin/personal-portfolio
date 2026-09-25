/** Original conceptual plates: subjects, never invented results. */
export default function SubjectArt({ index }: { index: number }) {
  return (
    <svg
      className="subject-art"
      viewBox="0 0 640 440"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth=".7" opacity=".16">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * 50 + 20} 20v400`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`h${i}`} d={`M20 ${i * 50 + 20}h600`} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        {index === 0 &&
          Array.from({ length: 9 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${136 + i * 17} ${56 + i * 17}) skewY(-12)`}
            >
              <path fill="var(--plate-ground, var(--color-surface))" d="M0 0h230v240H0z" />
              <path
                opacity=".45"
                d="M28 35h172M28 50h100M28 160h160M28 175h140M28 190h110"
              />
              <path d="m30 106 25 20 44-51" />
            </g>
          ))}
        {index === 1 && (
          <>
            <path opacity=".5" d="M70 340h510M90 360V60" />
            {Array.from({ length: 15 }, (_, i) => (
              <path
                key={i}
                opacity={0.2 + i / 22}
                d={`M90 320 C220 315 250 ${150 + i * 8} 330 220 S450 ${100 + i * 12} 570 ${50 + i * 22}`}
              />
            ))}
            <path strokeDasharray="3 7" d="M330 60v300" />
            <circle cx="330" cy="220" r="6" fill="currentColor" />
          </>
        )}
        {index === 2 && (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i} transform={`translate(${90 + i * 20} ${90 + i * 33})`}>
                <path fill="var(--plate-ground, var(--color-surface))" d="M0 0h400v75H0z" />
                <path
                  d="M25 25h65M120 25h115M280 25h95M25 50h105M190 50h60"
                  opacity=".6"
                />
                <circle cx="370" cy="50" r="5" />
              </g>
            ))}
          </>
        )}
        {index === 3 && (
          <>
            <path d="M95 90h160v230H95zM385 90h160v230H385z" />
            <path
              d="M120 120h110M120 140h80M410 120h110M410 140h80"
              opacity=".5"
            />
            <path d="M255 180h130m-20-20 20 20-20 20M385 250H255m20-20-20 20 20 20" />
            <path d="M175 320v40h290v-40" strokeDasharray="4 7" />
          </>
        )}
        {index === 4 && (
          <>
            {Array.from({ length: 29 }, (_, i) => {
              const x = 100 + (i % 6) * 83,
                y = 58 + Math.floor(i / 6) * 68;
              return (
                <g key={i}>
                  <path
                    d={`M${x} ${y}h52v42h-52z`}
                    fill={i % 5 === 0 ? "currentColor" : "none"}
                    opacity={i % 5 === 0 ? 0.8 : 0.3}
                  />
                  {i % 5 !== 0 && (
                    <path
                      opacity=".6"
                      d={`M${x + 10} ${y + 13}h30m-30 8h20m-20 8h25`}
                    />
                  )}
                </g>
              );
            })}
          </>
        )}
        {index === 5 && (
          <>
            {Array.from({ length: 22 }, (_, i) => (
              <path
                key={i}
                opacity={0.2 + i / 30}
                d={`M80 ${345 - i * 6}h${145 + i * 2}v${-35 - i * 4}h95v${-70 - i * 2}h95v-90h105`}
              />
            ))}
            <path d="M320 35v360" strokeDasharray="3 6" />
            <circle cx="320" cy="170" r="40" />
          </>
        )}
        {index === 6 && (
          <>
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse
                key={i}
                cx="320"
                cy="220"
                rx={45 + i * 15}
                ry={145 - i * 6}
                transform={`rotate(${i * 15} 320 220)`}
                opacity={0.25 + i / 20}
              />
            ))}
            <path d="M60 220h520M320 25v390" strokeDasharray="2 8" />
            <circle cx="320" cy="220" r="8" fill="currentColor" />
          </>
        )}
      </g>
      <path
        stroke="currentColor"
        d="M20 30V20h10M610 20h10v10M620 410v10h-10M30 420H20v-10"
      />
    </svg>
  );
}
