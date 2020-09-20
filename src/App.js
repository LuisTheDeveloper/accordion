import React, { Fragment, useState, useContext, createContext } from "react";
import { FaHeart, FaMountain, FaSkiing, FaWineGlassAlt } from "react-icons/fa";
import Description from "./Description";
import "./App.scss";

function Accordion({ data, disabled = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div data-accordion>
      {data.map((tab, index) => {
        const isActive = index === activeIndex;
        const isDisabled = disabled.includes(index);
        return (
          <Fragment key={index}>
            <div
              data-panel-title
              className={isDisabled ? "disabled" : isActive ? "expanded" : ""}
              onClick={() => {
                if (!isDisabled) setActiveIndex(index);
              }}
            >
              <span>{tab.label}</span>
              <span>{tab.icon}</span>
            </div>
            <div data-panel-content className={isActive ? "expanded" : ""}>
              {tab.content}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

const AccordionContext = createContext();

const AccordionCC = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div data-accordion>
      {children.map((child, index) => {
        return (
          <AccordionContext.Provider
            key={`section-${index}`}
            value={{ index, activeIndex, setActiveIndex }}
          >
            {child}
          </AccordionContext.Provider>
        );
      })}
    </div>
  );
};

const SectionContext = createContext();

const Section = ({ children, disabled }) => {
  return (
    <SectionContext.Provider value={{ disabled }}>
      <div data-section>{children}</div>
    </SectionContext.Provider>
  );
};

const Title = ({ children }) => {
  const { index, activeIndex, setActiveIndex } = useContext(AccordionContext);
  const isActive = index === activeIndex;
  const { disabled } = useContext(SectionContext);
  return (
    <div
      data-panel-title
      onClick={() => {
        if (!disabled) setActiveIndex(index);
      }}
      className={disabled ? "disabled" : isActive ? "expanded" : ""}
    >
      {children}
    </div>
  );
};

const Content = ({ children }) => {
  const { index, activeIndex } = useContext(AccordionContext);
  const isActive = index === activeIndex;
  return (
    <div data-panel-content className={isActive ? "expanded" : ""}>
      {children}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AccordionCC>
        <Section>
          <Title>
            Paris <FaMountain />
          </Title>
          <Content>
            <Description city="paris" />
          </Content>
        </Section>
        <Section disabled>
          <Title>
            Lech <FaSkiing />
          </Title>
          <Content>
            <Description city="lech" />
          </Content>
        </Section>
        <Section>
          <Title>
            Madrid <FaWineGlassAlt />
          </Title>
          <Content>
            <Description city="madrid" />
          </Content>
        </Section>
      </AccordionCC>
    </div>
  );
}

const data = [
  {
    label: "Paris",
    icon: <FaHeart />,
    content: <Description city="paris" />,
  },
  {
    label: "Lech",
    icon: <FaSkiing />,
    content: <Description city="lech" />,
  },
  {
    label: "Madrid",
    icon: <FaWineGlassAlt />,
    content: <Description city="madrid" />,
  },
];

export default App;

// function AccordionCC({ children }) {
// }

// function Section({ children, disabled }) {
// }

// function Title({ children }) {
// }

// function Content({ children }) {
// }
