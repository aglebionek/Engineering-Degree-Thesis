intersection(set(f), set(f), set(f)).
intersection(set(f), set(t), set(f)).
intersection(set(t), set(f), set(f)).
intersection(set(t), set(t), set(t)).

union(set(f), set(f), set(f)).
union(set(f), set(t), set(t)).
union(set(t), set(f), set(t)).
union(set(t), set(t), set(t)).

equal(set(f), set(f), set(t)).
equal(set(f), set(t), set(f)).
equal(set(t), set(f), set(f)).
equal(set(t), set(t), set(t)).

diff(set(f), set(f), set(f)).
diff(set(f), set(t), set(f)).
diff(set(t), set(f), set(t)).
diff(set(t), set(t), set(f)).

implication(set(f), set(f), set(t)).
implication(set(f), set(t), set(t)).
implication(set(t), set(f), set(f)).
implication(set(t), set(t), set(t)).

negation(set(f), set(t)).
negation(set(t), set(f)).

truth(t).

checklist([]).
checklist([H|T]) :- truth(H), checklist(T).

istrue(X) :- once(checklist(X)).

# %?- findall(_Z, (intersection(set(_A), set(_B), set(_L1)), diff(set(_A), set(_C), set(_L2)), equal(set(_L1), set(_L2), set(_L)), intersection(set(_L1), set(_C), set(_R1)), equal(set(_R1), set(f), set(_R)), implication(set(_L), set(_R), set(_Z))), _Q), istrue(_Q).