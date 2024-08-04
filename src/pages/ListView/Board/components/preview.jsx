import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getDragData, draftEvent, getUuid } from "@/utils";
import View from './view'
import style from "./row.module.scss"
import classnames from "classnames";

const App = (props) => {


  return (

      <div className={style.DropBoard}>
      {props?.view?.map((l, index) => (
                <div className={style.listsContainer}
     
                >
              
           
                      <div
       
                        className="list"
                      >
                  
                            <div
     
                              className="list-items"
                              style={ {
                                flex: 1,
                                padding: '8px',
                                border: '1px dotted lightgray',
                                display: 'flex',
                                overflowX: 'auto',
                                background: 'white'
                              }}
                            >
                       
                              {l.content.map((item, itemIndex) => (
                           
                                    <div
                          
                                      className="item"
                                      style={{
                                        margin: '4px',
                                        boxSizing: 'border-box',
                                        backgroundColor:  '',
                                        border: '1px solid #e3f2fd',
                                        width: `${100 / l.content.length}%`,
                                        height:  l.length,
                                      }}
                                    >
                                      <div
                           
                                        style={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                        <div style={{ padding: '10px' }}>
                                          {!!item.type ? <View
                                            type={item.type}
                                            name={item.key}
                                            themeType={props.themeType}
                                          /> : ""}
                                        </div>

                                      </div>
                                    </div>
                      
                              ))}
                            </div>
                       
                  
                      </div>
               
                </div>
              ))}
      </div>

  );
};

export default App;

